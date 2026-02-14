const verificarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    // 1. Cambiamos req.user por req.usuario (o como lo nombres en verificarToken)
    // 2. Cambiamos .roles (array) por .rol (string único)
    const usuario = req.usuario || req.user; 

    if (!usuario || !usuario.rol) {
      return res.status(403).json({ message: 'Acceso denegado: Usuario sin rol' });
    }

    // Como ahora es un solo string, usamos .includes directamente sobre el array de permitidos
    const tienePermiso = rolesPermitidos.includes(usuario.rol);

    if (!tienePermiso) {
      return res.status(403).json({ message: 'No tienes permisos para esta acción' });
    }

    next();
  };
};

module.exports = verificarRol;