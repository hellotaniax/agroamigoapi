const service = require('../services/agente.recomendaciones.service');

exports.obtenerRecomendacionesPublicadas = async (req, res) => {
  const data = await service.getRecomendacionesPublicadas();
  res.json(data);
};

exports.obtenerRecomendacionesCriticas = async (req, res) => {
  const data = await service.getRecomendacionesCriticas();
  res.json(data);
};