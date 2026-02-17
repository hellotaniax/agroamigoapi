const service = require('../services/agente.aplicacionesfertilizantes.service');

exports.obtenerAplicaciones = async (req, res) => {
  const data = await service.getAplicacionesValidas();
  res.json(data);
};

exports.validarAplicacion = async (req, res) => {
  const { nombre } = req.params;
  const valido = await service.esAplicacionValida(nombre);

  if (!valido) {
    return res.json({
      valido: false,
      mensaje: 'El tipo de aplicación no está soportado actualmente'
    });
  }

  res.json({ valido: true, aplicacion: nombre });
};