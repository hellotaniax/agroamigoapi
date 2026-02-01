const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.cultivosfertilizantes.controller');

// Asignar fertilizante a cultivo
router.post('/', controller.asignar);

// Listar fertilizantes de un cultivo
router.get('/fertilizantes/:idcul', controller.getFertilizantesPorCultivo);

// Listar cultivos de un fertilizante
router.get('/cultivos/:idfer', controller.getCultivosPorFertilizante);

// Actualizar observación
router.put('/:idcul/:idfer', controller.actualizarObservacion);

// Eliminar relación
router.delete('/:idcul/:idfer', controller.eliminar);

module.exports = router;