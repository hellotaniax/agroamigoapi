const db = require('../config/admindb');

// Obtener todas las formas de aplicación
exports.getFormasAplicacion = async () => {
  const { rows } = await db.query(
    'SELECT * FROM formas_aplicacion ORDER BY nombrefor'
  );
  return rows;
}

// Obtener forma de aplicación por ID
exports.getFormaAplicacionById = async (idfor) => {
  const { rows } = await db.query(
    'SELECT * FROM formas_aplicacion WHERE idfor = $1',
    [idfor]
  );
  return rows[0];
}

// Crear forma de aplicación
exports.createFormaAplicacion = async ({ nombrefor, descripcionfor }) => {
  const { rows } = await db.query(
    `INSERT INTO formas_aplicacion (nombrefor, descripcionfor)
     VALUES ($1, $2)
     RETURNING *`,
    [nombrefor, descripcionfor]
  );
  return rows[0];
}

// Actualizar forma de aplicación
exports.updateFormaAplicacion = async (idfor, { nombrefor, descripcionfor }) => {
  const { rows } = await db.query(
    `UPDATE formas_aplicacion
     SET nombrefor = $1, descripcionfor = $2
     WHERE idfor = $3
     RETURNING *`,
    [nombrefor, descripcionfor, idfor]
  );
  return rows[0];
}

// Eliminar forma de aplicación
exports.deleteFormaAplicacion = async (idfor) => {
  const { rows } = await db.query(
    'DELETE FROM formas_aplicacion WHERE idfor = $1 RETURNING *',
    [idfor]
  );
  return rows[0];
}

