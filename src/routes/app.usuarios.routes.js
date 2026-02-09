const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.usuarios.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/verificarrol');

// SOLO ADMINISTRADORES
router.get(
  '/',
  authMiddleware,
  verificarRol('administrador', 'superadministrador'),
  controller.getAll
);

router.get(
  '/:id',
  authMiddleware,
  verificarRol('administrador', 'superadministrador'),
  controller.getById
);

// SOLO ADMINISTRADORES
router.post(
  '/',
  authMiddleware,
  verificarRol('administrador', 'superadministrador'),
  controller.create
);

router.put(
  '/:id',
  authMiddleware,
  verificarRol('administrador', 'superadministrador'),
  controller.update
);

router.delete(
  '/:id',
  authMiddleware,
  verificarRol('administrador', 'superadministrador'),
  controller.delete
);

module.exports = router;