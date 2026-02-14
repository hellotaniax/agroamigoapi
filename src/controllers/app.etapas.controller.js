const service = require('../services/app.etapas.service');

// Listar todas las etapas
exports.getAll = async (req, res) => {
    try {
        const etapas = await service.getEtapas();
        res.json(etapas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener etapas' });
    }
};

// Obtener etapa por ID 
exports.getById = async (req, res) => {
    try {
        const ideta = parseInt(req.params.id);
        const etapa = await service.getEtapaById(ideta);
        if (!etapa) return res.status(404).json({ message: 'Etapa no encontrada' });
        res.json(etapa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener etapa' });
    }
};

// Crear nueva etapa
exports.create = async (req, res) => {
    try {
        const { nombreeta } = req.body;
        const nuevo = await service.createEtapa(nombreeta);
        res.status(201).json(nuevo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear etapa' });
    }
};

// Actualizar etapa
exports.update = async (req, res) => {
    try {
        const ideta = parseInt(req.params.id);
        const { nombreeta } = req.body;
        const actualizado = await service.updateEtapa(ideta, nombreeta);
        if (!actualizado) return res.status(404).json({ message: 'Etapa no encontrada' });
        res.json(actualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar etapa' });
    }
};

// Eliminar etapa
exports.delete = async (req, res) => {
    try {
        const ideta = parseInt(req.params.id);
        const eliminado = await service.deleteEtapa(ideta);
        if (!eliminado) return res.status(404).json({ message: 'Etapa no encontrada' });
        res.json({ message: 'Etapa eliminada', data: eliminado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar etapa' });
    }
};

