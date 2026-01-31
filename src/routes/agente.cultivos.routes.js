const express = require('express');
const router = express.Router();
const controller = require('../controllers/agente.cultivos.controller');

router.get('/', controller.obtenerCultivos);
router.get('/:nombre', controller.validarCultivo);
router.get('/:nombre/fertilizantes', controller.obtenerFertilizantes);
router.get('/:nombre/recomendaciones', controller.obtenerRecomendaciones);

module.exports = router;