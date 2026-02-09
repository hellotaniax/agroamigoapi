const service = require('../services/agente.cultivos.service');

exports.obtenerCultivos = async (req, res) => {
  const data = await service.getCultivosValidos();
  res.json(data);
};

exports.validarCultivo = async (req, res) => {
  const { nombre } = req.params;
  const valido = await service.esCultivoValido(nombre);

  if (!valido) {
    return res.json({
      valido: false,
      mensaje: 'El cultivo no está soportado actualmente'
    });
  }

  res.json({ valido: true, cultivo: nombre });
};