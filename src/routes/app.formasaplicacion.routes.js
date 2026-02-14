const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.formasaplicacion.controller');
<<<<<<< HEAD
const { todos, agronomo, admin } = require('../middlewares/permisos.config');

// CRUD completo
router.get('/', todos, controller.getAll);        // Listar todos
router.get('/:id',todos, controller.getById);    // Obtener por ID
router.post('/', agronomo, controller.create);       // Crear
router.put('/:id', agronomo,controller.update);     // Actualizar
router.delete('/:id',agronomo, controller.delete);  // Eliminar
=======
const { todos, agronomo } = require('../middlewares/permisos.config');

// CRUD completo
router.get('/', todos, controller.getAll);        // Listar todos
router.get('/:id', todos, controller.getById);    // Obtener por ID
router.post('/', agronomo, controller.create);       // Crear
router.put('/:id', agronomo, controller.update);     // Actualizar
router.delete('/:id', agronomo, controller.delete);  // Eliminar
>>>>>>> 7d3714b2b719a2fa8bb437a033efe7b6e8f4bece
module.exports = router;

