const { generarToken, compararPassword } = require('../services/auth.service');
const poolApp = require('../config/admindb');
const poolAgente = require('../config/agentedb');

const login = async (req, res) => {
  const { email, password, tipo } = req.body;
  // tipo = "app" | "agente"

  try {
    const pool = tipo === "agente" ? poolAgente : poolApp;

    if (!pool) return res.status(500).json({ message: "Pool de DB no definido" });

    // consulta para obtener roles asociados
    // Mover este query a un servicio específico de autenticación si es necesario
    const result = await pool.query(
      `
      SELECT
        u.idusu,
        u.nombreusu,
        u.emailusu,
        u.passwordusu,
        ARRAY_AGG(r.nombrerol) AS roles
      FROM usuarios u
      JOIN usuario_roles ur ON u.idusu = ur.idusu
      JOIN roles r ON ur.idrol = r.idrol
      WHERE u.emailusu = $1
      GROUP BY u.idusu, u.nombreusu, u.emailusu, u.passwordusu
      `,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const usuario = result.rows[0];

    // Comparar con la columna correcta
    const valido = await compararPassword(password, usuario.passwordusu);
    if (!valido) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = generarToken(usuario);

    res.json({
      token,
      usuario: {
        id: usuario.idusu,
        email: usuario.emailusu,
        roles: usuario.roles
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en login" });
  }
};

module.exports = { login };