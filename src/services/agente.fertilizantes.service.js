const db = require('../config/agentedb');

exports.getFertilizantesValidos = async () => {
  const { rows } = await db.query(
    'SELECT * FROM vw_ag_fertilizantes_validos'
  );
  return rows;
};

exports.esFertilizanteValido = async (nombre) => {
  const { rowCount } = await db.query(
    // Se asume columna 'nombrefer'. Ajustar si es necesario.
    'SELECT 1 FROM vw_ag_fertilizantes_validos WHERE LOWER(nombrefer) = LOWER($1)',
    [nombre]
  );
  return rowCount > 0;
};