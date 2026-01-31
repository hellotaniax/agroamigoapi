const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.cultivos.controller');

// Obtener todos los cultivos
router.get('/', controller.getCultivos);

// Obtener un cultivo por ID
router.get('/:id', controller.getCultivoById);

// Crear un nuevo cultivo
router.post('/', controller.createCultivo);

// Actualizar un cultivo existente por ID
router.put('/:id', controller.updateCultivo);

// Eliminar un cultivo por ID
router.delete('/:id', controller.deleteCultivo);

module.exports = router;