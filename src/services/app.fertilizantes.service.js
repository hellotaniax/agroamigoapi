const db = require('../config/admindb');

// Obtener todos los fertilizantes
exports.getFertilizantes = async () => {
  const { rows } = await db.query(
    `SELECT f.idfer, f.nombrefer, f.idtip, t.nombretip, f.descripcionfer, f.idest, e.nombreest
     FROM fertilizantes f
     JOIN tipos_fertilizante t ON f.idtip = t.idtip
     JOIN estados e ON f.idest = e.idest
     ORDER BY f.nombrefer`
  );
  return rows;
}

// Obtener un fertilizante por ID
exports.getFertilizanteById = async (idfer) => {
  const { rows } = await db.query(
    `SELECT f.idfer, f.nombrefer, f.idtip, t.nombretip, f.descripcionfer, f.idest, e.nombreest
     FROM fertilizantes f
     JOIN tipos_fertilizante t ON f.idtip = t.idtip
     JOIN estados e ON f.idest = e.idest
     WHERE f.idfer = $1`,
    [idfer]
  );
  return rows[0]; // solo un registro
}

// Crear un nuevo fertilizante
exports.createFertilizante = async ({ nombrefer, idtip, descripcionfer, idest }) => {
  const { rows } = await db.query(
    `INSERT INTO fertilizantes (nombrefer, idtip, descripcionfer, idest)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nombrefer, idtip, descripcionfer, idest]
  );
  return rows[0];
}

// Actualizar un fertilizante
exports.updateFertilizante = async (idfer, { nombrefer, idtip, descripcionfer, idest }) => {
  const { rows } = await db.query(
    `UPDATE fertilizantes
     SET nombrefer = $1,
         idtip = $2,
         descripcionfer = $3,
         idest = $4
     WHERE idfer = $5
     RETURNING *`,
    [nombrefer, idtip, descripcionfer, idest, idfer]
  );
  return rows[0];
}

// Eliminar un fertilizante
exports.deleteFertilizante = async (idfer) => {
  const { rows } = await db.query(
    `DELETE FROM fertilizantes
     WHERE idfer = $1
     RETURNING *`,
    [idfer]
  );
  return rows[0];
}