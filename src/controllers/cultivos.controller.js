const pool = require('../config/db');

const getCultivosPublicados = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM vw_ag_cultivos_publicados'
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al obtener cultivos'
    });
  }
};

module.exports = {
  getCultivosPublicados
};