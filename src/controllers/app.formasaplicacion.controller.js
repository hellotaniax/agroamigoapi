const service = require('../services/app.formasaplicacion.service');
// Listar todas las formas de aplicación
exports.getAll = async (req, res) => {
  try {
    const formas = await service.getFormasAplicacion(); 
    res.json(formas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener formas de aplicación' });
  }
};

// Obtener forma de aplicación por ID
exports.getById = async (req, res) => {
    try {
        const idfor = parseInt(req.params.id);
        const forma = await service.getFormaAplicacionById(idfor);
        if (!forma) return res.status(404).json({ message: 'Forma de aplicación no encontrada' });
        res.json(forma);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener forma de aplicación' });
    }
};

// Crear nueva forma de aplicación
exports.create = async (req, res) => {
    try {
        const { nombrefor, descripcionfor } = req.body;
        const nuevo = await service.createFormaAplicacion({ nombrefor, descripcionfor });
        res.status(201).json(nuevo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear forma de aplicación' });
    }   
};

// Actualizar forma de aplicación
exports.update = async (req, res) => {
    try {
        const idfor = parseInt(req.params.id);  
        const { nombrefor, descripcionfor } = req.body;
        const actualizado = await service.updateFormaAplicacion(idfor, { nombrefor, descripcionfor });
        if (!actualizado) return res.status(404).json({ message: 'Forma de aplicación no encontrada' });    
        res.json(actualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar forma de aplicación' });
    }
};

// Eliminar forma de aplicación
exports.delete = async (req, res) => {
    try {
        const idfor = parseInt(req.params.id);  
        const eliminado = await service.deleteFormaAplicacion(idfor);
        if (!eliminado) return res.status(404).json({ message: 'Forma de aplicación no encontrada' });
        res.json({ message: 'Forma de aplicación eliminada', data: eliminado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar forma de aplicación' });
    }
};

