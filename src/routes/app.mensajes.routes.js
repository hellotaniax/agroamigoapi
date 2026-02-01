const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.mensajes.controller');

router.get('/', controller.getMensajes);
router.get('/:id', controller.getMensajeById);
router.post('/', controller.createMensaje);
router.put('/:id', controller.updateMensaje);
router.delete('/:id', controller.deleteMensaje);

module.exports = router;