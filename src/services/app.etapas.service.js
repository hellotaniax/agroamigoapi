const db = require('../config/admindb');

// Obtener etapas
exports.getEtapas = async () => {
  const { rows } = await db.query(
    'SELECT * FROM etapas ORDER BY nombreeta'
  );
  return rows;
}

// Obtener etapa por ID
exports.getEtapaById = async (ideta) => {
  const { rows } = await db.query(
    'SELECT * FROM etapas WHERE ideta = $1',
    [ideta]
  );
    return rows[0];
}

// Crear etapa
exports.createEtapa = async (nombreeta) => {
  const { rows } = await db.query(
    'INSERT INTO etapas (nombreeta) VALUES ($1) RETURNING *',
    [nombreeta]
  );
  return rows[0];
}

// Actualizar etapa
exports.updateEtapa = async (ideta, nombreeta) => {
    const { rows } = await db.query(
    'UPDATE etapas SET nombreeta = $1 WHERE ideta = $2 RETURNING *',
    [nombreeta, ideta]
  );
  return rows[0];
}

// Eliminar etapa
exports.deleteEtapa = async (ideta) => {
  const { rows } = await db.query(
    'DELETE FROM etapas WHERE ideta = $1 RETURNING *',
    [ideta]
  );
  return rows[0];
}

