const db = require('../config/dbapp');

exports.getCultivos = async () => {
  const { rows } = await db.query(
    'SELECT nombrecul FROM cultivos ORDER BY nombrecul'
  );
  return rows;
}