const express = require('express');
const router = express.Router();
const controller = require('../controllers/agente.mensajes.controller');

router.get('/', controller.listarMensajes);
router.get('/:codigo', controller.obtenerMensajePorCodigo);

module.exports = router;