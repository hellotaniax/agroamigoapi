const pool = require('../config/db');

const getMensajesPublicados = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM vw_ag_mensajes_publicados'
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al obtener mensajes'
    });
  }
};

module.exports = {
  getMensajesPublicados
};