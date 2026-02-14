const db = require('../config/admindb');

// Obtener todas las aplicaciones de fertilizantes
exports.getAplicacionesFertilizantes = async () => {
  const { rows } = await db.query(
    'SELECT * FROM aplicaciones_fertilizantes ORDER BY idapl'
  );
  return rows;
};

// Obtener por ID 
exports.getAplicacionById = async (idapl) => {
  const { rows } = await db.query(
    'SELECT * FROM aplicaciones_fertilizantes WHERE idapl = $1',
    [idapl]
  );
  return rows[0];
};

// Crear nueva aplicación 
exports.createAplicacion = async (datos) => {
  const { idfer, idfor, ideta, dosisminapl, dosismaxapl, recomendacionapl } = datos;
  
  const { rows } = await db.query(
    `INSERT INTO aplicaciones_fertilizantes 
    (idfer, idfor, ideta, dosisminapl, dosismaxapl, recomendacionapl) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *`,
    [idfer, idfor, ideta, dosisminapl, dosismaxapl, recomendacionapl]
  );
  return rows[0];
};

// Actualizar aplicación
exports.updateAplicacion = async (idapl, datos) => {
  const { idfer, idfor, ideta, dosisminapl, dosismaxapl, recomendacionapl } = datos;
  const { rows } = await db.query(
    `UPDATE aplicaciones_fertilizantes 
     SET idfer = $1, idfor = $2, ideta = $3, dosisminapl = $4, dosismaxapl = $5, recomendacionapl = $6
     WHERE idapl = $7 RETURNING *`,
    [idfer, idfor, ideta, dosisminapl, dosismaxapl, recomendacionapl, idapl]
  );
  return rows[0];
};

// Eliminar aplicación
exports.deleteAplicacion = async (idapl) => {
  const { rows } = await db.query(
    'DELETE FROM aplicaciones_fertilizantes WHERE idapl = $1 RETURNING *',
    [idapl]
  );
  return rows[0];
};