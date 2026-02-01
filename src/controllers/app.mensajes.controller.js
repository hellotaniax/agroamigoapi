const service = require('../services/app.mensajes.service');

exports.getMensajes = async (req, res) => {
  try {
    const data = await service.getMensajes();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMensajeById = async (req, res) => {
  try {
    const { id } = req.params;
    const mensaje = await service.getMensajeById(id);

    if (!mensaje) {
      return res.status(404).json({ message: 'Mensaje no encontrado' });
    }

    res.json(mensaje);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMensaje = async (req, res) => {
  try {
    const newMensaje = await service.createMensaje(req.body);
    res.status(201).json(newMensaje);
  } catch (error) {
    if (error.code === '23505') { // Código de error de Postgres para unique_violation
        return res.status(400).json({ error: 'El código del mensaje ya existe' });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.updateMensaje = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMensaje = await service.updateMensaje(id, req.body);

    if (!updatedMensaje) {
      return res.status(404).json({ message: 'Mensaje no encontrado' });
    }

    res.json(updatedMensaje);
  } catch (error) {
    if (error.code === '23505') {
        return res.status(400).json({ error: 'El código del mensaje ya existe' });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMensaje = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.deleteMensaje(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Mensaje no encontrado' });
    }

    res.json({ message: 'Mensaje eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};