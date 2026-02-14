const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.fertilizantes.controller');
const { todos, agronomo, admin } = require('../middlewares/permisos.config');

// Rutas CRUD protegidas
router.get('/', todos, controller.getAll);           // Listar todos (Admin, Agrónomo, Investigador)
router.get('/:id', todos, controller.getById);      // Obtener por ID (Admin, Agrónomo, Investigador)
router.post('/', agronomo, controller.create);      // Crear (Agrónomo, Admin)
router.put('/:id', agronomo, controller.update);    // Actualizar (Agrónomo, Admin)
router.delete('/:id', agronomo, controller.delete); // Eliminar (Agrónomo, Admin)

module.exports = router;