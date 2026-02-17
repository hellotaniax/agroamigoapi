const express = require('express');
const router = express.Router();
const controller = require('../controllers/agente.fertilizantes.controller');

router.get('/', controller.obtenerFertilizantes);
router.get('/:nombre', controller.validarFertilizante);

module.exports = router;