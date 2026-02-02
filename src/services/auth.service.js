const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwtConfig } = require("../config/jwt.js");

const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.idusu,
      email: usuario.emailusu,
      roles: usuario.roles  
    },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );
};

const compararPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = { generarToken, compararPassword };