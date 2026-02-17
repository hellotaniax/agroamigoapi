const db = require('../config/agentedb');

exports.getAplicacionesValidas = async () => {
  const { rows } = await db.query(
    'SELECT * FROM vw_ag_aplicacionesfertilizantes_validos'
  );
  return rows;
};

exports.esAplicacionValida = async (nombre) => {
  const { rowCount } = await db.query(
    // Se asume columna 'nombreapp'. Ajustar si es necesario.
    'SELECT 1 FROM vw_ag_aplicacionesfertilizantes_validos WHERE LOWER(nombreapp) = LOWER($1)',
    [nombre]
  );
  return rowCount > 0;
};