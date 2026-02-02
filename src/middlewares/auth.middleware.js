const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config/jwt');

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token no enviado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded;  // <- aquí lo llamamos "user" y no "usuario"
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = verificarToken;