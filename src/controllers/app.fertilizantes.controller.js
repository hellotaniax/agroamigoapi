const service = require('../services/app.fertilizantes.service');

// Obtener todos los fertilizantes
exports.getAll = async (req, res) => {
  try {
    const fertilizantes = await service.getFertilizantes();
    res.json(fertilizantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener fertilizantes' });
  }
};

// Obtener fertilizante por ID
exports.getById = async (req, res) => {
  try {
    const idfer = parseInt(req.params.id);
    const fertilizante = await service.getFertilizanteById(idfer);
    if (!fertilizante) return res.status(404).json({ message: 'Fertilizante no encontrado' });
    res.json(fertilizante);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener fertilizante' });
  }
};

// Crear fertilizante
exports.create = async (req, res) => {
  try {
    const { nombrefer, idtip, descripcionfer, idest } = req.body;
    const nuevo = await service.createFertilizante({ nombrefer, idtip, descripcionfer, idest });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear fertilizante' });
  }
};

// Actualizar fertilizante
exports.update = async (req, res) => {
  try {
    const idfer = parseInt(req.params.id);
    const { nombrefer, idtip, descripcionfer, idest } = req.body;
    const actualizado = await service.updateFertilizante(idfer, { nombrefer, idtip, descripcionfer, idest });
    if (!actualizado) return res.status(404).json({ message: 'Fertilizante no encontrado' });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar fertilizante' });
  }
};

// Eliminar fertilizante
exports.delete = async (req, res) => {
  try {
    const idfer = parseInt(req.params.id);
    const eliminado = await service.deleteFertilizante(idfer);
    if (!eliminado) return res.status(404).json({ message: 'Fertilizante no encontrado' });
    res.json({ message: 'Fertilizante eliminado', fertilizante: eliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar fertilizante' });
  }
};