// routes/cultivos.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.cultivos.controller');
const { todos, agronomo } = require('../middlewares/permisos.config');

// Obtener todos los cultivos
router.get('/', todos, controller.getCultivos);

// Obtener un cultivo por ID
router.get('/:id', todos, controller.getCultivoById);

// Crear un nuevo cultivo
router.post('/', agronomo, controller.createCultivo);

// Actualizar un cultivo existente por ID
router.put('/:id', agronomo, controller.updateCultivo);

// Eliminar un cultivo por ID
router.delete('/:id', agronomo, controller.deleteCultivo);

module.exports = router;