const verificarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    // Usamos req.user que es lo que viene de verificarToken
    const usuario = req.user; 

    // Verificamos si existe el usuario y si tiene la propiedad 'rol'
    if (!usuario || !usuario.rol) {
      return res.status(403).json({ 
        message: 'Acceso denegado: El token no contiene información de rol' 
      });
    }

    // Comparamos el rol del token con los permitidos en la ruta
    const tienePermiso = rolesPermitidos.includes(usuario.rol);

    if (!tienePermiso) {
      return res.status(403).json({ 
        message: `No tienes permisos. Tu rol es: ${usuario.rol}` 
      });
    }

    next();
  };
};

module.exports = verificarRol;