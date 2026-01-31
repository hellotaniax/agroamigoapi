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

exports.getFertilizantesPorCultivo = async (nombre) => {
  const { rows } = await db.query(
    `SELECT nombrefer, nombretip, observacioncfe
     FROM vw_ag_fertilizantes_por_cultivo
     WHERE LOWER(nombrecul) = LOWER($1)`,
    [nombre]
  );
  return rows;
};

exports.getRecomendacionesPorCultivo = async (nombre) => {
  const { rows } = await db.query(
    `SELECT titulorec, descripcionrec, nombrepri
     FROM vw_ag_recomendaciones_por_cultivo
     WHERE LOWER(nombrecul) = LOWER($1)`,
    [nombre]
  );
  return rows;
};