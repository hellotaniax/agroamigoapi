const express = require('express');
const router = express.Router();
const controller = require('../controllers/app.cultivos.controller');

router.get('/', controller.getCultivos);

module.exports = router;