const service = require('../services/app.aplicacionesfertilizantes.service');

// Listar todas las aplicaciones de fertilizantes
exports.getAll = async (req, res) => {
  try {
    const aplicaciones = await service.getAplicacionesFertilizantes();
    res.json(aplicaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener aplicaciones' });
  }
};

// Obtener aplicación por ID
exports.getById = async (req, res) => {
  try {
    const idapl = req.params.id; 
    const aplicacion = await service.getAplicacionById(idapl);
    
    if (!aplicacion) return res.status(404).json({ message: 'Aplicación no encontrada' });
    res.json(aplicacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener aplicación' });
  }
};

// Crear nueva aplicación
exports.create = async (req, res) => {
  try {
    const datos = req.body;
    const nuevaAplicacion = await service.createAplicacion(datos);
    res.status(201).json(nuevaAplicacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear aplicación' });
  }
};

// Actualizar aplicación
exports.update = async (req, res) => {
  try {
    const idapl = req.params.id; // Sin parseInt
    const datos = req.body;
    const aplicacionActualizada = await service.updateAplicacion(idapl, datos);
    
    if (!aplicacionActualizada) return res.status(404).json({ message: 'Aplicación no encontrada' });
    res.json(aplicacionActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar aplicación' });
  }
};

// Eliminar aplicación
exports.delete = async (req, res) => {
  try {
    const idapl = req.params.id; // Sin parseInt
    const aplicacionEliminada = await service.deleteAplicacion(idapl);
    
    if (!aplicacionEliminada) return res.status(404).json({ message: 'Aplicación no encontrada' });
    res.json({ message: 'Aplicación eliminada', data: aplicacionEliminada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar aplicación' });
  }
};