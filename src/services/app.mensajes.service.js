const db = require('../config/admindb');

exports.getMensajes = async () => {
  const { rows } = await db.query(
    'SELECT * FROM mensajes ORDER BY codigomen'
  );
  return rows;
};

exports.getMensajeById = async (id) => {
  const { rows } = await db.query(
    'SELECT * FROM mensajes WHERE idmen = $1',
    [id]
  );
  return rows[0];
};

exports.createMensaje = async ({ codigomen, contenidomen, idest }) => {
  const { rows } = await db.query(
    `INSERT INTO mensajes (codigomen, contenidomen, idest)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [codigomen, contenidomen, idest]
  );
  return rows[0];
};

exports.updateMensaje = async (id, { codigomen, contenidomen, idest }) => {
  const { rows } = await db.query(
    `UPDATE mensajes
     SET codigomen = $1, 
         contenidomen = $2, 
         idest = $3
     WHERE idmen = $4
     RETURNING *`,
    [codigomen, contenidomen, idest, id]
  );
  return rows[0];
};

exports.deleteMensaje = async (id) => {
  const { rowCount } = await db.query(
    'DELETE FROM mensajes WHERE idmen = $1',
    [id]
  );
  return rowCount > 0;
};