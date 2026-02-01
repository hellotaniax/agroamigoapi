const express = require('express');
const router = express.Router();
const urController = require('../controllers/app.usuariosroles.controller');

// CRUD para asignaciones
router.post('/', urController.asignar);                 // Asignar rol a usuario
router.get('/usuario/:idusu', urController.getRolesPorUsuario); // Roles de un usuario
router.get('/rol/:idrol', urController.getUsuariosPorRol);      // Usuarios de un rol
router.delete('/:idusu/:idrol', urController.eliminar);         // Eliminar asignación

module.exports = router;