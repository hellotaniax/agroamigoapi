const db = require('../config/agentedb');

/**
 * Obtener todos los fertilizantes disponibles
 */
exports.getFertilizantes = async () => {
  const { rows } = await db.query(`
    SELECT DISTINCT fertilizante
    FROM vw_ag_aplicaciones_detalladas
    ORDER BY fertilizante
  `);

  return rows.map(r => r.fertilizante);
};

/**
 * Obtener formas de aplicación para un fertilizante
 */
exports.getFormasPorFertilizante = async (fertilizante) => {
  const { rows } = await db.query(`
    SELECT DISTINCT forma_aplicacion
    FROM vw_ag_aplicaciones_detalladas
    WHERE LOWER(fertilizante) = LOWER($1)
    ORDER BY forma_aplicacion
  `, [fertilizante]);

  return rows.map(r => r.forma_aplicacion);
};

/**
 * Obtener etapas disponibles según fertilizante y forma
 */
exports.getEtapas = async (fertilizante, formaAplicacion) => {
  const { rows } = await db.query(`
    SELECT DISTINCT etapa_cultivo
    FROM vw_ag_aplicaciones_detalladas
    WHERE LOWER(fertilizante) = LOWER($1)
      AND LOWER(forma_aplicacion) = LOWER($2)
    ORDER BY etapa_cultivo
  `, [fertilizante, formaAplicacion]);

  return rows.map(r => r.etapa_cultivo);
};

/**
 * Obtener recomendación final
 */
exports.getRecomendacion = async (fertilizante, formaAplicacion, etapaCultivo) => {
  const { rows } = await db.query(`
    SELECT *
    FROM vw_ag_aplicaciones_detalladas
    WHERE LOWER(fertilizante) = LOWER($1)
      AND LOWER(forma_aplicacion) = LOWER($2)
      AND LOWER(etapa_cultivo) = LOWER($3)
    LIMIT 1
  `, [fertilizante, formaAplicacion, etapaCultivo]);

  return rows[0] || null;
};

/**
 * Buscar fertilizantes por nombre (para entrada libre del usuario)
 */
exports.buscarFertilizante = async (nombre) => {
  const { rows } = await db.query(`
    SELECT DISTINCT fertilizante
    FROM vw_ag_aplicaciones_detalladas
    WHERE LOWER(fertilizante) LIKE LOWER($1)
    ORDER BY fertilizante
  `, [`%${nombre}%`]);

  return rows.map(r => r.fertilizante);
};

/**
 * Validar si existe una forma de aplicación
 */
exports.esAplicacionValida = async (forma) => {
  const { rowCount } = await db.query(`
    SELECT 1
    FROM vw_ag_aplicaciones_detalladas
    WHERE LOWER(forma_aplicacion) = LOWER($1)
    LIMIT 1
  `, [forma]);

  return rowCount > 0;
};
