const service = require('../services/app.recomendacionescultivos.service');

exports.getAll = async (req, res) => {
  try {
    const data = await service.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByIds = async (req, res) => {
  try {
    const { idrec, idcul } = req.params; 
    const data = await service.getByIds(idrec, idcul);

    if (!data) {
      return res.status(404).json({ message: 'Asignación no encontrada' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newData = await service.create(req.body);
    res.status(201).json(newData);
  } catch (error) {
    // Error de llave duplicada
    if (error.code === '23505') {
        return res.status(400).json({ error: 'Esta recomendación ya está asignada a este cultivo.' });
    }
    // Error de llave foránea 
    if (error.code === '23503') {
        return res.status(400).json({ error: 'El ID de recomendación o de cultivo no existe.' });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { idrec, idcul } = req.params;
    const deleted = await service.delete(idrec, idcul);

    if (!deleted) {
      return res.status(404).json({ message: 'Asignación no encontrada' });
    }

    res.json({ message: 'Asignación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};