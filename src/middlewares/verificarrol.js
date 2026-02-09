const verificarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    // Verificación básica
    if (!req.user || !req.user.roles) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    // Verificar si el usuario tiene al menos uno de los roles permitidos
    const tienePermiso = req.user.roles.some(rol =>
      rolesPermitidos.includes(rol)
    );

    if (!tienePermiso) {
      return res.status(403).json({ message: 'No tienes permisos para esta acción' });
    }

    next();
  };
};

module.exports = verificarRol;