const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.recomendaciones.controller');
const { todos, investigador } = require('../middlewares/permisos.config');

router.get('/', todos, controller.getRecomendaciones);               
router.get('/:id', todos, controller.getRecomendacionById);         
router.post('/', investigador, controller.createRecomendacion);         
router.put('/:id', investigador, controller.updateRecomendacion);       
router.delete('/:id', investigador, controller.deleteRecomendacion);    

module.exports = router;