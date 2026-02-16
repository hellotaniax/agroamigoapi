const { Router } = require('express');
const { 
  login, 
  cambiarPassword,
  solicitarRecuperacion,
  restablecerPassword
} = require('../controllers/auth.controller');
const verificarToken = require('../middlewares/auth.middleware');

const router = Router();

// ===============================
// Rutas públicas (sin autenticación)
// ===============================
router.post('/login', login);
router.post('/solicitar-recuperacion', solicitarRecuperacion);
router.post('/restablecer-password', restablecerPassword);

// ===============================
// Rutas protegidas (requieren token)
// ===============================
router.put('/cambiar-password', verificarToken, cambiarPassword);

module.exports = router;