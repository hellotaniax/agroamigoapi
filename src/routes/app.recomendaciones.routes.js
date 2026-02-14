const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.recomendaciones.controller');
const { todos, agronomo, admin } = require('../middlewares/permisos.config');

router.get('/', todos, controller.getRecomendaciones);                // Listar (Admin, Agrónomo, Investigador)
router.get('/:id', todos, controller.getRecomendacionById);         // Obtener por ID (Admin, Agrónomo, Investigador)
router.post('/', agronomo, controller.createRecomendacion);         // Crear (Agrónomo, Admin)
router.put('/:id', agronomo, controller.updateRecomendacion);       // Actualizar (Agrónomo, Admin)
router.delete('/:id', agronomo, controller.deleteRecomendacion);    // Eliminar (Agrónomo, Admin)

module.exports = router;