const db = require('../config/dbagente');

exports.getCultivosValidos = async () => {
  const { rows } = await db.query(
    'SELECT nombrecul FROM vw_ag_cultivos_validos'
  );
  return rows;
};

exports.esCultivoValido = async (nombre) => {
  const { rowCount } = await db.query(
    'SELECT 1 FROM vw_ag_cultivos_validos WHERE LOWER(nombrecul) = LOWER($1)',
    [nombre]
  );
  return rowCount > 0;
};
