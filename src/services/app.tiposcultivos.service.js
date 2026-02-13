const db = require('../config/admindb');

// Obtener todos los tipos de cultivo
exports.getTiposCultivos = async () => {
  const { rows } = await db.query(
    'SELECT * FROM tipos_cultivos ORDER BY nombretcul'
  );
  return rows;
}

// Obtener tipo por ID
exports.getTipoCultivoById = async (idtcul) => {
  const { rows } = await db.query(
    'SELECT * FROM tipos_cultivos WHERE idtcul = $1',
    [idtcul]
  );
  return rows[0];
}

// Crear tipo de cultivo
exports.createTipoCultivo = async (nombretcul) => {
  const { rows } = await db.query(
    'INSERT INTO tipos_cultivos (nombretcul) VALUES ($1) RETURNING *',
    [nombretcul]
  );
  return rows[0];
}

// Actualizar tipo de cultivo
exports.updateTipoCultivo = async (idtcul, nombretcul) => {
  const { rows } = await db.query(
    'UPDATE tipos_cultivos SET nombretcul = $1 WHERE idtcul = $2 RETURNING *',
    [nombretcul, idtcul]
  );
  return rows[0];
}

// Eliminar tipo de cultivo
exports.deleteTipoCultivo = async (idtcul) => {
  const { rows } = await db.query(
    'DELETE FROM tipos_cultivos WHERE idtcul = $1 RETURNING *',
    [idtcul]
  );
  return rows[0];
}