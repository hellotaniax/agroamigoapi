const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwtConfig } = require("../config/jwt.js");

const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol
    },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );
};

const compararPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = { generarToken, compararPassword };