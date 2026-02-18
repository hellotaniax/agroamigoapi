const express = require('express');
const router = express.Router();
const controller = require('../controllers/agente.aplicacionesfertilizantes.controller');

/**
 * 🌱 1️⃣ Obtener fertilizantes disponibles
 * GET /api/agente/fertilizantes
 */
router.get('/fertilizantes', controller.obtenerFertilizantes);

/**
 * 🔎 2️⃣ Buscar fertilizante por nombre
 * GET /api/agente/fertilizantes/buscar/:nombre
 */
router.get('/fertilizantes/buscar/:nombre', controller.buscarFertilizante);

/**
 * 💧 3️⃣ Obtener formas de aplicación por fertilizante
 * GET /api/agente/fertilizantes/:fertilizante/formas
 */
router.get('/fertilizantes/:fertilizante/formas', controller.obtenerFormas);

/**
 * 🌾 4️⃣ Obtener etapas por fertilizante y forma
 * GET /api/agente/fertilizantes/:fertilizante/formas/:forma/etapas
 */
router.get(
  '/fertilizantes/:fertilizante/formas/:forma/etapas',
  controller.obtenerEtapas
);

/**
 * 📏 5️⃣ Obtener recomendación final
 * GET /api/agente/recomendacion?fertilizante=&forma=&etapa=
 */
router.get('/recomendacion', controller.obtenerRecomendacion);

/**
 * ✅ 6️⃣ Validar forma de aplicación
 * GET /api/agente/aplicaciones/validar/:forma
 */
router.get('/aplicaciones/validar/:forma', controller.validarAplicacion);

module.exports = router;
