const express = require('express');
const router = express.Router();
const controller = require('../controllers/agente.recomendaciones.controller');

router.get('/', controller.obtenerRecomendacionesPublicadas);
router.get('/criticas', controller.obtenerRecomendacionesCriticas);

module.exports = router;