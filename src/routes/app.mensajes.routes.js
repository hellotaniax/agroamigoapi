const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.mensajes.controller');
const { todos, investigador } = require('../middlewares/permisos.config');

router.get('/', todos, controller.getMensajes);                // Listar 
router.get('/:id', todos, controller.getMensajeById);         // Obtener por ID 
router.post('/', investigador, controller.createMensaje);         // Crear 
router.put('/:id', investigador, controller.updateMensaje);       // Actualizar 
router.delete('/:id', investigador, controller.deleteMensaje);    // Eliminar 

module.exports = router;