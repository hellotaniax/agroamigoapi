const db = require('../config/admindb');

exports.getRecomendaciones = async () => {
  const { rows } = await db.query(
    'SELECT * FROM recomendaciones ORDER BY idpri ASC, titulorec ASC'
  );
  return rows;
};

exports.getRecomendacionById = async (id) => {
  const { rows } = await db.query(
    'SELECT * FROM recomendaciones WHERE idrec = $1',
    [id]
  );
  return rows[0];
};

exports.createRecomendacion = async ({ titulorec, descripcionrec, idest, idpri }) => {
  const { rows } = await db.query(
    `INSERT INTO recomendaciones (titulorec, descripcionrec, idest, idpri)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [titulorec, descripcionrec, idest, idpri]
  );
  return rows[0];
};

exports.updateRecomendacion = async (idrec, { titulorec, descripcionrec, idest, idpri }) => {
  const { rows } = await db.query(
    `UPDATE recomendaciones
     SET titulorec = $1, 
         descripcionrec = $2, 
         idest = $3, 
         idpri = $4
     WHERE idrec = $5
     RETURNING *`,
    [titulorec, descripcionrec, idest, idpri, idrec]
  );
  return rows[0];
};

exports.deleteRecomendacion = async (id) => {
  const { rowCount } = await db.query(
    'DELETE FROM recomendaciones WHERE idrec = $1',
    [id]
  );
  return rowCount > 0;
};