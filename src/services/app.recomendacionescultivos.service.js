const db = require('../config/dbapp');

exports.getAll = async () => {
  const { rows } = await db.query(`
    SELECT rc.idrec, r.titulorec, rc.idcul, c.nombrecul
    FROM recomendacion_cultivo rc
    JOIN recomendaciones r ON rc.idrec = r.idrec
    JOIN cultivos c ON rc.idcul = c.idcul
  `);
  return rows;
};

exports.getByIds = async (idrec, idcul) => {
  const { rows } = await db.query(
    'SELECT * FROM recomendacion_cultivo WHERE idrec = $1 AND idcul = $2',
    [idrec, idcul]
  );
  return rows[0];
};

exports.create = async ({ idrec, idcul }) => {
  const { rows } = await db.query(
    `INSERT INTO recomendacion_cultivo (idrec, idcul)
     VALUES ($1, $2)
     RETURNING *`,
    [idrec, idcul]
  );
  return rows[0];
};

exports.delete = async (idrec, idcul) => {
  const { rowCount } = await db.query(
    'DELETE FROM recomendacion_cultivo WHERE idrec = $1 AND idcul = $2',
    [idrec, idcul]
  );
  return rowCount > 0;
};