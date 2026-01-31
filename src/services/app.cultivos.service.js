const db = require('../config/dbapp');

exports.getCultivos = async () => {
  const { rows } = await db.query(
    'SELECT nombrecul FROM cultivos ORDER BY nombrecul'
  );
  return rows;
}
/**
 * Obtener un cultivo específico por su ID
 * @param {number} id - idcul
 */
exports.getCultivoById = async (id) => {
  const { rows } = await db.query(
    'SELECT * FROM cultivos WHERE idcul = $1',
    [id]
  );
  // Retorna el primer elemento o undefined si no existe
  return rows[0];
};

/**
 * Crear un nuevo cultivo
 * @param {Object} data - Objeto con { nombrecul, descripcioncul, idest }
 */
exports.createCultivo = async ({ nombrecul, descripcioncul, idest }) => {
  const { rows } = await db.query(
    `INSERT INTO cultivos (nombrecul, descripcioncul, idest)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [nombrecul, descripcioncul, idest]
  );
  return rows[0];
};

/**
 * Actualizar un cultivo existente
 * @param {number} id - idcul
 * @param {Object} data - Objeto con { nombrecul, descripcioncul, idest }
 */
exports.updateCultivo = async (id, { nombrecul, descripcioncul, idest }) => {
  const { rows } = await db.query(
    `UPDATE cultivos
     SET nombrecul = $1, 
         descripcioncul = $2, 
         idest = $3, 
         updatedatcul = CURRENT_TIMESTAMP
     WHERE idcul = $4
     RETURNING *`,
    [nombrecul, descripcioncul, idest, id]
  );
  return rows[0];
};

/**
 * Eliminar un cultivo
 * @param {number} id - idcul
 */
exports.deleteCultivo = async (id) => {
  const { rowCount } = await db.query(
    'DELETE FROM cultivos WHERE idcul = $1',
    [id]
  );
  // Retorna true si se eliminó una fila, false si no se encontró
  return rowCount > 0;
};