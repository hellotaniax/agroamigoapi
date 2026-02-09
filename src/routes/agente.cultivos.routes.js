const express = require('express');
const router = express.Router();
const controller = require('../controllers/agente.cultivos.controller');

router.get('/', controller.obtenerCultivos);
router.get('/:nombre', controller.validarCultivo);

module.exports = router;