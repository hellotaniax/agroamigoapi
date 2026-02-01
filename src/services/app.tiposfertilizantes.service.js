const db = require('../config/dbapp');

// Obtener todos los tipos de fertilizante
exports.getTipos = async () => {
  const { rows } = await db.query(
    'SELECT * FROM tipos_fertilizante ORDER BY nombretip'
  );
  return rows;
}

// Obtener tipo por ID
exports.getTipoById = async (idtip) => {
  const { rows } = await db.query(
    'SELECT * FROM tipos_fertilizante WHERE idtip = $1',
    [idtip]
  );
  return rows[0];
}

// Crear tipo de fertilizante
exports.createTipo = async (nombretip) => {
  const { rows } = await db.query(
    'INSERT INTO tipos_fertilizante (nombretip) VALUES ($1) RETURNING *',
    [nombretip]
  );
  return rows[0];
}

// Actualizar tipo de fertilizante
exports.updateTipo = async (idtip, nombretip) => {
  const { rows } = await db.query(
    'UPDATE tipos_fertilizante SET nombretip = $1 WHERE idtip = $2 RETURNING *',
    [nombretip, idtip]
  );
  return rows[0];
}

// Eliminar tipo de fertilizante
exports.deleteTipo = async (idtip) => {
  const { rows } = await db.query(
    'DELETE FROM tipos_fertilizante WHERE idtip = $1 RETURNING *',
    [idtip]
  );
  return rows[0];
}