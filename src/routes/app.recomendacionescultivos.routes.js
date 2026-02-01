const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.recomendacionescultivos.controller');

// Obtener todas las asignaciones
router.get('/', controller.getAll);

// Obtener una asignación específica 
// Ejemplo URL: /api/asignaciones/1/5  (Donde 1 es idrec y 5 es idcul)
router.get('/:idrec/:idcul', controller.getByIds);

// Crear una nueva asignación
router.post('/', controller.create);

// Eliminar una asignación 
router.delete('/:idrec/:idcul', controller.delete);

module.exports = router;