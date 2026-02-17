const express = require('express');
const router = express.Router();
const controller = require('../controllers/agente.aplicacionesfertilizantes.controller');

router.get('/', controller.obtenerAplicaciones);
router.get('/:nombre', controller.validarAplicacion);

module.exports = router;