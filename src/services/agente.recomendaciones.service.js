const db = require('../config/db');

exports.getRecomendacionesPublicadas = async () => {
  const { rows } = await db.query(
    `SELECT idrec, titulorec, descripcionrec, nombrepri
     FROM vw_ag_recomendaciones_publicadas`
  );
  return rows;
};

exports.getRecomendacionesPorCultivo = async (nombre) => {
  const { rows } = await db.query(
    `SELECT nombrecul, titulorec, descripcionrec, nombrepri
     FROM vw_ag_recomendaciones_por_cultivo
     WHERE LOWER(nombrecul) = LOWER($1)`,
    [nombre]
  );
  return rows;
};

exports.getRecomendacionesCriticas = async () => {
  const { rows } = await db.query(
    `SELECT titulorec, descripcionrec, nombrepri
     FROM vw_ag_recomendaciones_publicadas
     WHERE nombrepri = 'alta'`
  );
  return rows;
};