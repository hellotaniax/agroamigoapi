const db = require('../config/agentedb');

exports.getRecomendacionesPublicadas = async () => {
  const { rows } = await db.query(
    `SELECT idrec, titulorec, descripcionrec, nombrepri
     FROM vw_ag_recomendaciones_publicadas`
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