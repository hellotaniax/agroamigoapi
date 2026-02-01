const db = require('../config/dbapp');

// Asignar fertilizante a cultivo
exports.asignarFertilizante = async ({ idcul, idfer, observacioncfe }) => {
  const { rows } = await db.query(
    `INSERT INTO cultivo_fertilizante (idcul, idfer, observacioncfe)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [idcul, idfer, observacioncfe]
  );
  return rows[0];
}

// Eliminar relación
exports.eliminarFertilizante = async (idcul, idfer) => {
  const { rows } = await db.query(
    `DELETE FROM cultivo_fertilizante
     WHERE idcul = $1 AND idfer = $2
     RETURNING *`,
    [idcul, idfer]
  );
  return rows[0];
}

// Listar fertilizantes de un cultivo
exports.getFertilizantesPorCultivo = async (idcul) => {
  const { rows } = await db.query(
    `SELECT cf.idfer, f.nombrefer, cf.observacioncfe
     FROM cultivo_fertilizante cf
     JOIN fertilizantes f ON cf.idfer = f.idfer
     WHERE cf.idcul = $1`,
    [idcul]
  );
  return rows;
}

// Listar cultivos de un fertilizante
exports.getCultivosPorFertilizante = async (idfer) => {
  const { rows } = await db.query(
    `SELECT cf.idcul, c.nombrecul, cf.observacioncfe
     FROM cultivo_fertilizante cf
     JOIN cultivos c ON cf.idcul = c.idcul
     WHERE cf.idfer = $1`,
    [idfer]
  );
  return rows;
}

// Actualizar observación
exports.actualizarObservacion = async (idcul, idfer, observacioncfe) => {
  const { rows } = await db.query(
    `UPDATE cultivo_fertilizante
     SET observacioncfe = $3
     WHERE idcul = $1 AND idfer = $2
     RETURNING *`,
    [idcul, idfer, observacioncfe]
  );
  return rows[0];
}