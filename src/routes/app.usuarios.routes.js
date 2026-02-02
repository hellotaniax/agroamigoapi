const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.usuarios.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Cualquiera autenticado
router.get('/', authMiddleware, controller.getAll);
router.get('/:id', authMiddleware, controller.getById);

// Solo ADMIN
router.post('/', authMiddleware, controller.create);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.delete);

module.exports = router;