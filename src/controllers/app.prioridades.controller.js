const service = require('../services/app.prioridades.service');
// Listar todas las prioridades
exports.getAll = async (req, res) => {
    try {
        const prioridades = await service.getPrioridades();
        res.json(prioridades);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener prioridades' });
    }
};

// Obtener prioridad por ID
exports.getById = async (req, res) => {
    try {
        const idpri = parseInt(req.params.id);  
        const prioridad = await service.getPrioridadById(idpri);
        if (!prioridad) return res.status(404).json({ message: 'Prioridad no encontrada' });
        res.json(prioridad);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener prioridad' });
    }
};

// Crear nueva prioridad    
exports.create = async (req, res) => {
    try {
        const { nombrepri } = req.body;
        const nuevo = await service.createPrioridad(nombrepri);
        res.status(201).json(nuevo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear prioridad' });
    }
};

// Actualizar prioridad
exports.update = async (req, res) => {
    try {
        const idpri = parseInt(req.params.id);
        const { nombrepri } = req.body;
        const actualizado = await service.updatePrioridad(idpri, nombrepri);
        if (!actualizado) return res.status(404).json({ message: 'Prioridad no encontrada' });
        res.json(actualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar prioridad' });
    }
};

// Eliminar prioridad
exports.delete = async (req, res) => {
    try {
        const idpri = parseInt(req.params.id);
        const eliminado = await service.deletePrioridad(idpri);
        if (!eliminado) return res.status(404).json({ message: 'Prioridad no encontrada' });
        res.json({ message: 'Prioridad eliminada', data: eliminado });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar prioridad' });
    }
};