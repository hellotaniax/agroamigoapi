const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.aplicacionesfertilizantes.controller');
const { todos, agronomo, admin } = require('../middlewares/permisos.config');
// CRUD completo
router.get('/',todos, controller.getAll);
router.get('/:id',todos, controller.getById); 
router.post('/',agronomo, controller.create);
router.put('/:id',agronomo, controller.update); 
router.delete('/:id',agronomo, controller.delete); 
module.exports = router;