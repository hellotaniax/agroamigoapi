const service = require('../services/app.cultivos.service');
exports.getCultivos = async (req, res) => {
  const data = await service.getCultivos();
  res.json(data);
}