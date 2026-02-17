const {
  generarToken,
  compararPassword,
  hashearPassword,
  generarCodigoRecuperacion,
  hashearCodigo,
  compararCodigo
} = require('../services/auth.service');
const { enviarCodigoRecuperacion } = require('../services/email.service');
const poolApp = require('../config/admindb');
const poolAgente = require('../config/agentedb');

/**
 * Login de usuario
 */
const login = async (req, res) => {
  const { email, password, tipo } = req.body;

  const MAX_INTENTOS = 3;
  const MINUTOS_BLOQUEO = 30;

  try {
    const pool = tipo === "agente" ? poolAgente : poolApp;
    if (!pool) return res.status(500).json({ message: "Pool de DB no definido" });

    const result = await pool.query(
      `SELECT u.idusu, u.nombreusu, u.emailusu, u.contraseniausu,
              u.intentos_fallidos, u.bloqueado_hasta,
              r.nombrerol AS rol, e.nombreest AS estado
       FROM usuarios u
       JOIN roles r ON u.idrol = r.idrol
       JOIN estados e ON u.idest = e.idest
       WHERE u.emailusu = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const usuario = result.rows[0];

    // Verificar que la cuenta esté activa
    if (usuario.estado !== 'Activo') {
      return res.status(403).json({ 
        message: "Esta cuenta no está activa. Contacta al administrador." 
      });
    }

    // 1. Si el bloqueo ya expiró, limpiar contadores antes de continuar
    if (usuario.bloqueado_hasta && new Date(usuario.bloqueado_hasta) <= new Date()) {
      await pool.query(
        `UPDATE usuarios
         SET intentos_fallidos = 0,
             bloqueado_hasta    = NULL,
             ultimo_intento     = NULL
         WHERE idusu = $1`,
        [usuario.idusu]
      );
      usuario.intentos_fallidos = 0;
      usuario.bloqueado_hasta   = null;
    }

    // 2. Verificar si sigue bloqueado activamente
    if (usuario.bloqueado_hasta && new Date(usuario.bloqueado_hasta) > new Date()) {
      const minutosRestantes = Math.ceil(
        (new Date(usuario.bloqueado_hasta) - new Date()) / 60000
      );
      return res.status(403).json({
        message: `Cuenta bloqueada. Intenta de nuevo en ${minutosRestantes} minuto(s).`,
        bloqueado: true,
        bloqueado_hasta: usuario.bloqueado_hasta
      });
    }

    // 3. Verificar contraseña
    const valido = await compararPassword(password, usuario.contraseniausu);

    if (!valido) {
      const nuevosIntentos = (usuario.intentos_fallidos || 0) + 1;
      const ahora = new Date();
      const seBloqueaAhora = nuevosIntentos >= MAX_INTENTOS;
      const bloqueadoHasta = seBloqueaAhora
        ? new Date(ahora.getTime() + MINUTOS_BLOQUEO * 60000)
        : null;

      await pool.query(
        `UPDATE usuarios
         SET intentos_fallidos = $1,
             ultimo_intento     = $2,
             bloqueado_hasta    = $3
         WHERE idusu = $4`,
        [nuevosIntentos, ahora, bloqueadoHasta, usuario.idusu]
      );

      if (seBloqueaAhora) {
        return res.status(403).json({
          message: `Demasiados intentos fallidos. Cuenta bloqueada por ${MINUTOS_BLOQUEO} minutos.`,
          bloqueado: true,
          bloqueado_hasta: bloqueadoHasta
        });
      }

      return res.status(401).json({
        message: `Credenciales inválidas. Intentos restantes: ${MAX_INTENTOS - nuevosIntentos}`
      });
    }

    // 4. Login exitoso → resetear contadores
    await pool.query(
      `UPDATE usuarios
       SET intentos_fallidos = 0,
           bloqueado_hasta    = NULL,
           ultimo_intento     = NULL
       WHERE idusu = $1`,
      [usuario.idusu]
    );

    const token = generarToken(usuario);

    res.json({
      token,
      usuario: {
        id: usuario.idusu,
        email: usuario.emailusu,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en login" });
  }
};

/**
 * Cambia la contraseña del usuario autenticado
 */
const cambiarPassword = async (req, res) => {
  const { passwordActual, passwordNueva, tipo } = req.body;
  const usuarioId = req.user.id;

  try {
    if (!passwordActual || !passwordNueva) {
      return res.status(400).json({
        message: "Se requiere la contraseña actual y la nueva contraseña"
      });
    }

    if (passwordNueva.length < 6) {
      return res.status(400).json({
        message: "La nueva contraseña debe tener al menos 6 caracteres"
      });
    }

    if (passwordActual === passwordNueva) {
      return res.status(400).json({
        message: "La nueva contraseña debe ser diferente a la actual"
      });
    }

    const pool = tipo === "agente" ? poolAgente : poolApp;

    if (!pool) {
      return res.status(500).json({ message: "Pool de DB no definido" });
    }

    const result = await pool.query(
      'SELECT idusu, contraseniausu FROM usuarios WHERE idusu = $1',
      [usuarioId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const usuario = result.rows[0];

    const passwordValida = await compararPassword(passwordActual, usuario.contraseniausu);

    if (!passwordValida) {
      return res.status(401).json({ message: "La contraseña actual es incorrecta" });
    }

    const nuevaPasswordHash = await hashearPassword(passwordNueva);

    await pool.query(
      'UPDATE usuarios SET contraseniausu = $1 WHERE idusu = $2',
      [nuevaPasswordHash, usuarioId]
    );

    res.json({
      message: "Contraseña actualizada exitosamente"
    });

  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ message: "Error al cambiar la contraseña" });
  }
};

/**
 * Solicitar código de recuperación de contraseña
 */
const solicitarRecuperacion = async (req, res) => {
  const { email, tipo } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "El email es requerido" });
    }

    const pool = tipo === "agente" ? poolAgente : poolApp;

    if (!pool) {
      return res.status(500).json({ message: "Pool de DB no definido" });
    }

    const result = await pool.query(
      'SELECT idusu, emailusu, nombreusu FROM usuarios WHERE emailusu = $1',
      [email]
    );

    // Por seguridad, siempre retornar el mismo mensaje
    if (result.rows.length === 0) {
      return res.json({
        message: "Si el email existe, recibirás un código de recuperación"
      });
    }

    const usuario = result.rows[0];

    const codigo = generarCodigoRecuperacion();
    const codigoHash = await hashearCodigo(codigo);
    const expiracion = new Date(Date.now() + 15 * 60 * 1000);

    await pool.query(
      `UPDATE usuarios 
       SET codigo_recuperacion = $1, 
           codigo_expiracion = $2 
       WHERE idusu = $3`,
      [codigoHash, expiracion, usuario.idusu]
    );

    try {
      await enviarCodigoRecuperacion(usuario.emailusu, codigo, usuario.nombreusu);
      console.log(`✅ Código de recuperación enviado a ${email}`);
    } catch (emailError) {
      console.error('❌ Error al enviar email:', emailError);
    }

    res.json({
      message: "Si el email existe, recibirás un código de recuperación"
    });

  } catch (error) {
    console.error('Error al solicitar recuperación:', error);
    res.status(500).json({ message: "Error al procesar la solicitud" });
  }
};

/**
 * Restablecer contraseña con código de recuperación
 */
const restablecerPassword = async (req, res) => {
  const { email, codigo, passwordNueva, tipo } = req.body;

  try {
    if (!email || !codigo || !passwordNueva) {
      return res.status(400).json({
        message: "Email, código y nueva contraseña son requeridos"
      });
    }

    if (passwordNueva.length < 6) {
      return res.status(400).json({
        message: "La nueva contraseña debe tener al menos 6 caracteres"
      });
    }

    const pool = tipo === "agente" ? poolAgente : poolApp;

    if (!pool) {
      return res.status(500).json({ message: "Pool de DB no definido" });
    }

    const result = await pool.query(
      `SELECT idusu, emailusu, codigo_recuperacion, codigo_expiracion 
       FROM usuarios 
       WHERE emailusu = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Código inválido o expirado" });
    }

    const usuario = result.rows[0];

    if (!usuario.codigo_recuperacion || !usuario.codigo_expiracion) {
      return res.status(400).json({ message: "Código inválido o expirado" });
    }

    const ahora = new Date();
    const expiracion = new Date(usuario.codigo_expiracion);

    if (ahora > expiracion) {
      await pool.query(
        `UPDATE usuarios 
         SET codigo_recuperacion = NULL, 
             codigo_expiracion = NULL 
         WHERE idusu = $1`,
        [usuario.idusu]
      );

      return res.status(400).json({ message: "Código expirado" });
    }

    const codigoValido = await compararCodigo(codigo, usuario.codigo_recuperacion);

    if (!codigoValido) {
      return res.status(400).json({ message: "Código inválido" });
    }

    const nuevaPasswordHash = await hashearPassword(passwordNueva);

    await pool.query(
      `UPDATE usuarios 
       SET contraseniausu = $1,
           codigo_recuperacion = NULL,
           codigo_expiracion = NULL
       WHERE idusu = $2`,
      [nuevaPasswordHash, usuario.idusu]
    );

    res.json({
      message: "Contraseña restablecida exitosamente"
    });

  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    res.status(500).json({ message: "Error al restablecer la contraseña" });
  }
};

module.exports = {
  login,
  cambiarPassword,
  solicitarRecuperacion,
  restablecerPassword
};