const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config/jwt');

/**
 * Middleware para verificar el token JWT
 */
const verificarToken = (req, res, next) => {
  try {
    // Obtener el token del header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Token no enviado' });
    }

    // El token viene en formato: "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Formato de token inválido' });
    }

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, jwtConfig.secret);
    
    // Guardar información del usuario en el request
    req.user = decoded;
    
    next();
  } catch (err) {
    console.error('Error al verificar token:', err);

    // Manejo específico de errores de JWT
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido' });
    }

    return res.status(500).json({ message: 'Error al verificar token' });
  }
};

module.exports = verificarToken;