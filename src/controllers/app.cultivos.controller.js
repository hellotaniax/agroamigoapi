const service = require('../services/app.cultivos.service');

exports.getCultivos = async (req, res) => {
  try {
    const data = await service.getCultivos();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCultivoById = async (req, res) => {
  try {
    const { id } = req.params; 
    const cultivo = await service.getCultivoById(id);
    
    if (!cultivo) {
      return res.status(404).json({ message: 'Cultivo no encontrado' });
    }
    
    res.json(cultivo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCultivo = async (req, res) => {
  try {
    // req.body debe traer { nombrecul, descripcioncul, idest }
    const newCultivo = await service.createCultivo(req.body);
    res.status(201).json(newCultivo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCultivo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCultivo = await service.updateCultivo(id, req.body);
    
    if (!updatedCultivo) {
      return res.status(404).json({ message: 'Cultivo no encontrado' });
    }
    
    res.json(updatedCultivo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCultivo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.deleteCultivo(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Cultivo no encontrado' });
    }
    
    res.json({ message: 'Cultivo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};