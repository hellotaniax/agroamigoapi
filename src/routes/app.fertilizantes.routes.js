const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.fertilizantes.controller');

// Rutas CRUD
router.get('/', controller.getAll);           // Listar todos
router.get('/:id', controller.getById);      // Obtener por ID
router.post('/', controller.create);         // Crear
router.put('/:id', controller.update);       // Actualizar
router.delete('/:id', controller.delete);    // Eliminar

module.exports = router;