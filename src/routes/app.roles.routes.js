const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.roles.controller');
const { admin, todos} = require('../middlewares/permisos.config');

// CRUD completo
router.get('/', todos,controller.getAll);        // Listar todos
router.get('/:id', todos, controller.getById);    // Obtener por ID
router.post('/', admin, controller.create);       // Crear
router.put('/:id', admin,controller.update);     // Actualizar
router.delete('/:id', admin, controller.delete);  // Eliminar

module.exports = router;