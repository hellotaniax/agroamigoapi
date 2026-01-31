const { Router } = require('express');
const { getMensajesPublicados } = require('../controllers/mensajes.controller');

const router = Router();

router.get('/', getMensajesPublicados);
module.exports = router;