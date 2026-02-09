const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.cultivos.controller');
const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/verificarrol');

// Obtener todos los cultivos
router.get(
  '/',
  verificarToken,
  verificarRol('superadministrador', 'agronomo', 'investigador'),
  controller.getCultivos
);

// Obtener un cultivo por ID
router.get(
  '/:id',
  verificarToken,
  verificarRol('superadministrador', 'agronomo', 'investigador'),
  controller.getCultivoById
);

// Crear un nuevo cultivo
router.post(
  '/',
  verificarToken,
  verificarRol('superadministrador', 'agronomo'),
  controller.createCultivo
);

// Actualizar un cultivo existente por ID
router.put(
  '/:id',
  verificarToken,
  verificarRol('superadministrador', 'agronomo'),
  controller.updateCultivo
);

// Eliminar un cultivo por ID
router.delete(
  '/:id',
  verificarToken,
  verificarRol('superadministrador', 'agronomo'),
  controller.deleteCultivo
);

module.exports = router;