const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.recomendaciones.controller');

router.get('/', controller.getRecomendaciones);
router.get('/:id', controller.getRecomendacionById);
router.post('/', controller.createRecomendacion);
router.put('/:id', controller.updateRecomendacion);
router.delete('/:id', controller.deleteRecomendacion);

module.exports = router;