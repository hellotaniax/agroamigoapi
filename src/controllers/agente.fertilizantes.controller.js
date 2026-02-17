const service = require('../services/agente.fertilizantes.service');

exports.obtenerFertilizantes = async (req, res) => {
  const data = await service.getFertilizantesValidos();
  res.json(data);
};

exports.validarFertilizante = async (req, res) => {
  const { nombre } = req.params;
  const valido = await service.esFertilizanteValido(nombre);

  if (!valido) {
    return res.json({
      valido: false,
      mensaje: 'El fertilizante no está soportado actualmente'
    });
  }

  res.json({ valido: true, fertilizante: nombre });
};