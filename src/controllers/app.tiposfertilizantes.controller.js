const service = require('../services/app.tiposfertilizantes.service');

// Listar todos los tipos
exports.getAll = async (req, res) => {
  try {
    const tipos = await service.getTipos();
    res.json(tipos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener tipos de fertilizante' });
  }
};

// Obtener tipo por ID
exports.getById = async (req, res) => {
  try {
    const idtip = parseInt(req.params.id);
    const tipo = await service.getTipoById(idtip);
    if (!tipo) return res.status(404).json({ message: 'Tipo no encontrado' });
    res.json(tipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener tipo' });
  }
};

// Crear tipo
exports.create = async (req, res) => {
  try {
    const { nombretip } = req.body;
    const nuevo = await service.createTipo(nombretip);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear tipo de fertilizante' });
  }
};

// Actualizar tipo
exports.update = async (req, res) => {
  try {
    const idtip = parseInt(req.params.id);
    const { nombretip } = req.body;
    const actualizado = await service.updateTipo(idtip, nombretip);
    if (!actualizado) return res.status(404).json({ message: 'Tipo no encontrado' });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar tipo' });
  }
};

// Eliminar tipo
exports.delete = async (req, res) => {
  try {
    const idtip = parseInt(req.params.id);
    const eliminado = await service.deleteTipo(idtip);
    if (!eliminado) return res.status(404).json({ message: 'Tipo no encontrado' });
    res.json({ message: 'Tipo eliminado', data: eliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar tipo' });
  }
};