const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.estados.controller');
const { todos, investigador } = require('../middlewares/permisos.config');

// CRUD completo
router.get('/', todos, controller.getAll);        // Listar todos
router.get('/:id', todos, controller.getById);    // Obtener por ID
router.post('/', investigador, controller.create);       // Crear
router.put('/:id', investigador, controller.update);     // Actualizar
router.delete('/:id', investigador, controller.delete);  // Eliminar
module.exports = router;    