// routes/usuarios.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.usuarios.controller');
const { admin } = require('../middlewares/permisos.config');

// Todas estas rutas ahora están protegidas solo para Administradores
router.get('/', admin, controller.getAll);
router.get('/:id', admin, controller.getById);
router.post('/', admin, controller.create);
router.put('/:id', admin, controller.update);
router.delete('/:id', admin, controller.delete);

module.exports = router;