const { generarToken, compararPassword } = require('../services/auth.service');
const poolApp = require('../config/dbapp');       
const poolAgente = require('../config/dbagente'); 

const login = async (req, res) => {
  const { email, password, tipo } = req.body;
  // tipo = "app" | "agente"

  try {
    const pool = tipo === "agente" ? poolAgente : poolApp;

    if (!pool) return res.status(500).json({ message: "Pool de DB no definido" });

    // Consulta usando columnas reales
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE emailusu = $1",
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
        // rol: usuario.rolusu // solo si existe la columna
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en login" });
  }
};

module.exports = { login };