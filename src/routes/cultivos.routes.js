const { Router } = require('express');
const { getCultivosPublicados } = require('../controllers/cultivos.controller');

const router = Router();

router.get('/', getCultivosPublicados);

module.exports = router;