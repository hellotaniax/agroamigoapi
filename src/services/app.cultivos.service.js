const db = require('../config/admindb');

exports.getCultivos = async () => {
  const { rows } = await db.query(
    'SELECT idcul, nombrecul FROM cultivos ORDER BY nombrecul'
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
 * @param {Object} data - Objeto con { nombrecul, idtcul, idest }
 */
exports.createCultivo = async ({ nombrecul, idtcul, idest }) => {
  const { rows } = await db.query(
    `INSERT INTO cultivos (nombrecul, idtcul, idest)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [nombrecul, idtcul, idest]
  );
  return rows[0];
};

/**
 * Actualizar un cultivo existente
 * @param {number} id - idcul
 * @param {Object} data - Objeto con { nombrecul, idtcul, idest }
 */
exports.updateCultivo = async (id, { nombrecul, idtcul, idest }) => {
  const { rows } = await db.query(
    `UPDATE cultivos
     SET nombrecul = $1, 
         idtcul = $2, 
         idest = $3, 
         updatedatcul = CURRENT_TIMESTAMP
     WHERE idcul = $4
     RETURNING *`,
    [nombrecul, idtcul, idest, id]
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