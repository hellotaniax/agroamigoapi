module.exports = (err, req, res, next) => {
  console.error("🔥 ERROR GLOBAL:", err);

  // PostgreSQL: duplicado
  if (err.code === '23505') {
    return res.status(409).json({
      error: 'Registro duplicado',
      detalle: err.detail
    });
  }

  //  PostgreSQL: NOT NULL
  if (err.code === '23502') {
    return res.status(400).json({
      error: 'Campo obligatorio faltante',
      detalle: err.column
    });
  }

  // Error personalizado por código
  if (err.code === 'DUPLICATE_NAME') {
    return res.status(409).json({
      error: 'El registro ya existe'
    });
  }

  // Cualquier error con status definido (400, 404, 401, etc.)
  if (err.status) {
    return res.status(err.status).json({
      error: err.message
    });
  }

  // Error por defecto
  res.status(500).json({
    error: 'Error interno del servidor'
  });
};
