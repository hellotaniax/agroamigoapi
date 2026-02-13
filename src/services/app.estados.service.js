const db = require('../config/admindb');

// Obtener estados
exports.getEstados = async () => {
  const { rows } = await db.query(
    'SELECT * FROM estados ORDER BY nombreest'
  );
  return rows;
}

// Obtener estado por ID
exports.getEstadoById = async (idest) => {
  const { rows } = await db.query(
    'SELECT * FROM estados WHERE idest = $1',
    [idest]
  );
  return rows[0];
}

// Crear de estado
exports.createEstado = async (nombreest) => {
  const { rows } = await db.query(
    'INSERT INTO estados (nombreest) VALUES ($1) RETURNING *',
    [nombreest]
  );
  return rows[0];
}

// Actualizar estado
exports.updateEstado = async (idest, nombreest) => {
  const { rows } = await db.query(
    'UPDATE estados SET nombreest = $1 WHERE idest = $2 RETURNING *',
    [nombreest, idest]
  );
  return rows[0];
}

// Eliminar de estado
exports.deleteEstado = async (idest) => {
  const { rows } = await db.query(
    'DELETE FROM estados WHERE idest = $1 RETURNING *',
    [idest]
  );
  return rows[0];
}