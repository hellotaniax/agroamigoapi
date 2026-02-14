const db = require('../config/admindb');

// Obtener todos los fertilizantes
exports.getFertilizantes = async () => {
  const { rows } = await db.query(
    `SELECT * FROM fertilizantes ORDER BY nombrefer`
  );
  return rows;
}

// Obtener un fertilizante por ID
exports.getFertilizanteById = async (idfer) => {
  const { rows } = await db.query(
    `SELECT f.idfer, f.nombrefer, f.descripcionfer, f.idest, e.nombreest, f.idtfer, t.nombretfer
     FROM fertilizantes f
     JOIN estados e ON f.idest = e.idest
     JOIN tipos_fertilizantes t ON f.idtfer = t.idtfer
     WHERE f.idfer = $1`,
    [idfer]
  );
  return rows[0]; // solo un registro
}

// Crear un nuevo fertilizante
exports.createFertilizante = async ({ nombrefer, idtfer, descripcionfer, idest }) => {
  const { rows } = await db.query(
    `INSERT INTO fertilizantes (nombrefer, idtfer, descripcionfer, idest)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nombrefer, idtfer, descripcionfer, idest]
  );
  return rows[0];
};

// Actualizar un fertilizante existente
exports.updateFertilizante = async (idfer, { nombrefer, idtfer, descripcionfer, idest }) => {
  const { rows } = await db.query(
    `UPDATE fertilizantes
     SET nombrefer = $1,
         idtfer = $2,
         descripcionfer = $3,
         idest = $4
     WHERE idfer = $5
     RETURNING *`,
    [nombrefer, idtfer, descripcionfer, idest, idfer]
  );
  return rows[0];
};

// Eliminar un fertilizante (Borrado físico)
exports.deleteFertilizante = async (idfer) => {
  const { rows } = await db.query(
    `DELETE FROM fertilizantes
     WHERE idfer = $1
     RETURNING *`,
    [idfer]
  );
  return rows[0];
};