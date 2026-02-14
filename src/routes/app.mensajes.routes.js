const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.mensajes.controller');
const { todos, agronomo, admin } = require('../middlewares/permisos.config');

router.get('/', todos, controller.getMensajes);                // Listar (Admin, Agrónomo, Investigador)
router.get('/:id', todos, controller.getMensajeById);         // Obtener por ID (Admin, Agrónomo, Investigador)
router.post('/', agronomo, controller.createMensaje);         // Crear (Agrónomo, Admin)
router.put('/:id', agronomo, controller.updateMensaje);       // Actualizar (Agrónomo, Admin)
router.delete('/:id', agronomo, controller.deleteMensaje);    // Eliminar (Agrónomo, Admin)

module.exports = router;