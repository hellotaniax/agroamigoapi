const db = require('../config/agentedb');

exports.getMensajesPublicados = async () => {
  const { rows } = await db.query(
    'SELECT codigomen, contenidomen FROM vw_ag_mensajes_publicados'
  );
  return rows;
};

exports.getMensajePorCodigo = async (codigo) => {
  const { rows } = await db.query(
    `SELECT codigomen, contenidomen
     FROM vw_ag_mensajes_publicados
     WHERE codigomen = $1`,
    [codigo]
  );

  return rows.length > 0 ? rows[0] : null;
};