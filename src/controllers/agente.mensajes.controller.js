const service = require('../services/agente.mensajes.service');

exports.listarMensajes = async (req, res) => {
  const data = await service.getMensajesPublicados();
  res.json(data);
};

exports.obtenerMensajePorCodigo = async (req, res) => {
  const { codigo } = req.params;
  const mensaje = await service.getMensajePorCodigo(codigo);

  if (!mensaje) {
    return res.json({
      codigo,
      mensaje: 'Mensaje no disponible en este momento.'
    });
  }

  res.json({
    codigo: mensaje.codigomen,
    mensaje: mensaje.contenidomen
  });
};