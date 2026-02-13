const db = require('../config/admindb');

// Obtener todos los roles
exports.getRoles = async () => {
  const { rows } = await db.query(
    'SELECT * FROM roles ORDER BY nombrerol'
  );
  return rows;
}

// Obtener rol por ID
exports.getRolById = async (idrol) => {
  const { rows } = await db.query(
    'SELECT * FROM roles WHERE idrol = $1',
    [idrol]
  );
  return rows[0];
}

// Crear rol
exports.createRol = async ({ nombrerol, descripcionrol }) => {
  const { rows } = await db.query(
    `INSERT INTO roles (nombrerol, descripcionrol)
     VALUES ($1, $2)
     RETURNING *`,
    [nombrerol, descripcionrol]
  );
  return rows[0];
}

// Actualizar rol
exports.updateRol = async (idrol, { nombrerol, descripcionrol }) => {
  const { rows } = await db.query(
    `UPDATE roles
     SET nombrerol = $1, descripcionrol = $2
     WHERE idrol = $3
     RETURNING *`,
    [nombrerol, descripcionrol, idrol]
  );
  return rows[0];
}

// Eliminar rol
exports.deleteRol = async (idrol) => {
  const { rows } = await db.query(
    'DELETE FROM roles WHERE idrol = $1 RETURNING *',
    [idrol]
  );
  return rows[0];
}