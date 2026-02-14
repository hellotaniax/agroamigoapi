const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.cultivos.controller');
const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/verificarrol');

// Obtener todos los cultivos
router.get(
  '/',
  verificarToken,
  verificarRol('Admin', 'agronomo', 'investigador'),
  controller.getCultivos
);

// Obtener un cultivo por ID
router.get(
  '/:id',
  verificarToken,
  verificarRol('Admin', 'agronomo', 'investigador'),
  controller.getCultivoById
);

// Crear un nuevo cultivo
router.post(
  '/',
  verificarToken,
  verificarRol('Admin', 'agronomo'),
  controller.createCultivo
);

// Actualizar un cultivo existente por ID
router.put(
  '/:id',
  verificarToken,
  verificarRol('Admin', 'agronomo'),
  controller.updateCultivo
);

// Eliminar un cultivo por ID
router.delete(
  '/:id',
  verificarToken,
  verificarRol('Admin', 'agronomo'),
  controller.deleteCultivo
);

module.exports = router;