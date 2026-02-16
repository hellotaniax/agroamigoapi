const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { jwtConfig } = require("../config/jwt.js");

/**
 * Genera un token JWT basado en la estructura de la DB
 * @param {Object} usuario - Debe contener idusu, emailusu y rol
 * @returns {string} Token JWT
 */
const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.idusu,
      email: usuario.emailusu,
      rol: usuario.rol
    },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );
};

/**
 * Compara la contraseña en texto plano con el hash
 * @param {string} password - Contraseña en texto plano
 * @param {string} hash - Hash almacenado en la base de datos
 * @returns {Promise<boolean>}
 */
const compararPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

/**
 * Hashea una contraseña en texto plano
 * @param {string} password - Contraseña en texto plano
 * @returns {Promise<string>} Hash de la contraseña
 */
const hashearPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Genera un código de recuperación de 6 dígitos
 * @returns {string} Código de 6 dígitos
 */
const generarCodigoRecuperacion = () => {
  return crypto.randomInt(100000, 999999).toString();
};

/**
 * Genera un hash del código de recuperación
 * @param {string} codigo - Código en texto plano
 * @returns {Promise<string>} Hash del código
 */
const hashearCodigo = async (codigo) => {
  return bcrypt.hash(codigo, 10);
};

/**
 * Compara un código con su hash
 * @param {string} codigo - Código en texto plano
 * @param {string} hash - Hash almacenado
 * @returns {Promise<boolean>}
 */
const compararCodigo = async (codigo, hash) => {
  return bcrypt.compare(codigo, hash);
};

module.exports = { 
  generarToken, 
  compararPassword, 
  hashearPassword,
  generarCodigoRecuperacion,
  hashearCodigo,
  compararCodigo
};