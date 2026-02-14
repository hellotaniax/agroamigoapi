const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwtConfig } = require("../config/jwt.js");

/**
 * Genera un token JWT basado en la nueva estructura de la DB
 * @param {Object} usuario - Debe contener idusu, emailusu y rol (singular)
 */
const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.idusu,
      email: usuario.emailusu,
      rol: usuario.idrol // Cambiado de 'roles' a 'rol' para coincidir con el JOIN de la DB
    },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );
};

/**
 * Compara la contraseña en texto plano con el hash 'contraseniausu'
 */
const compararPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = { generarToken, compararPassword };