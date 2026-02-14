const { generarToken, compararPassword } = require('../services/auth.service');
const poolApp = require('../config/admindb');
const poolAgente = require('../config/agentedb');

const login = async (req, res) => {
  const { email, password, tipo } = req.body;

  try {
    const pool = tipo === "agente" ? poolAgente : poolApp;

    if (!pool) return res.status(500).json({ message: "Pool de DB no definido" });

    // Consulta actualizada para usar la relación directa con la tabla roles
    // SELECT que debe estar en tu servicio de login
    const result = await pool.query(
      `SELECT u.idusu, u.nombreusu, u.emailusu, u.contraseniausu, r.nombrerol AS rol
      FROM usuarios u
      JOIN roles r ON u.idrol = r.idrol
      WHERE u.emailusu = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const usuario = result.rows[0];

    // Se usa usuario.contraseniausu que es el nombre real en tu DB
    const valido = await compararPassword(password, usuario.contraseniausu);
    if (!valido) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

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

module.exports = { login };