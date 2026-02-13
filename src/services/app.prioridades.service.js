const db = require('../config/admindb');

// Obtener prioridades
exports.getPrioridades = async () => {
  const { rows } = await db.query(
    'SELECT * FROM prioridades ORDER BY nombrepri'
  );
  return rows;
}

// Obtener prioridad por ID
exports.getPrioridadById = async (idpri) => {
  const { rows } = await db.query(
    'SELECT * FROM prioridades WHERE idpri = $1',
    [idpri]
  );
  return rows[0];
}

// Crear prioridad
exports.createPrioridad = async (nombrepri) => {
  const { rows } = await db.query(
    'INSERT INTO prioridades (nombrepri) VALUES ($1) RETURNING *',
    [nombrepri]
  );
  return rows[0];
}

// Actualizar prioridad
exports.updatePrioridad = async (idpri, nombrepri) => {
  const { rows } = await db.query(
    'UPDATE prioridades SET nombrepri = $1 WHERE idpri = $2 RETURNING *',
    [nombrepri, idpri]
  );
  return rows[0];
}

// Eliminar prioridad
exports.deletePrioridad = async (idpri) => {
  const { rows } = await db.query(
    'DELETE FROM prioridades WHERE idpri = $1 RETURNING *',
    [idpri]
  );
  return rows[0];
}