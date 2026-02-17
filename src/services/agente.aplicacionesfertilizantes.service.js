const db = require('../config/agentedb');

exports.getAplicacionesValidas = async () => {
  const { rows } = await db.query(
    'SELECT * FROM vw_ag_aplicaciones_detalladas'
  );
  return rows;
};

exports.esAplicacionValida = async (nombre) => {
  const { rowCount } = await db.query(
    
    'SELECT 1 FROM vw_ag_aplicaciones_detalladas WHERE LOWER(forma_aplicacion) = LOWER($1) LIMIT 1',
    [nombre]
  );
  return rowCount > 0;
};