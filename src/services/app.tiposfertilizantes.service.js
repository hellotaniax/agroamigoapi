const db = require('../config/dbapp');

// Obtener todos los tipos de fertilizante
exports.getTipos = async () => {
  const { rows } = await db.query(
    'SELECT * FROM tipos_fertilizantes ORDER BY nombretfer'
  );
  return rows;
}

// Obtener tipo por ID
exports.getTipoById = async (idtfer) => {
  const { rows } = await db.query(
    'SELECT * FROM tipos_fertilizantes WHERE idtfer = $1',
    [idtfer]
  );
  return rows[0];
}

// Crear tipo de fertilizante
exports.createTipo = async (nombretfer) => {
  const { rows } = await db.query(
    'INSERT INTO tipos_fertilizantes (nombretfer) VALUES ($1) RETURNING *',
    [nombretferq]
  );
  return rows[0];
}

// Actualizar tipo de fertilizante
exports.updateTipo = async (idtfer, nombretfer) => {
  const { rows } = await db.query(
    'UPDATE tipos_fertilizantes SET nombretfer = $1 WHERE idtfer = $2 RETURNING *',
    [nombretfer, idtfer]
  );
  return rows[0];
}

// Eliminar tipo de fertilizante
exports.deleteTipo = async (idtfer) => {
  const { rows } = await db.query(
    'DELETE FROM tipos_fertilizantes WHERE idtfer = $1 RETURNING *',
    [idtfer]
  );
  return rows[0];
}