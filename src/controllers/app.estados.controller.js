const service = require('../services/app.estados.service');
// Listar todos los estados
exports.getAll = async (req, res) => {
    try {
        const estados = await service.getEstados();
        res.json(estados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener estados' });
    }
};

// Obtener estado por ID
exports.getById = async (req, res) => {
    try {
        const idest = parseInt(req.params.id);  
        const estado = await service.getEstadoById(idest);
        if (!estado) return res.status(404).json({ message: 'Estado no encontrado' });
        res.json(estado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener estado' });
    }
};

// Crear nuevo estado       
exports.create = async (req, res) => {
    try {
        const { nombreest } = req.body; 
        const nuevo = await service.createEstado(nombreest);
        res.status(201).json(nuevo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear estado' });
    }
};

// Actualizar estado
exports.update = async (req, res) => {
    try {
        const idest = parseInt(req.params.id);  
        const { nombreest } = req.body;
        const actualizado = await service.updateEstado(idest, nombreest);
        if (!actualizado) return res.status(404).json({ message: 'Estado no encontrado' });
        res.json(actualizado);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar estado' });
    }
};

// Eliminar estado
exports.delete = async (req, res) => {
    try {
        const idest = parseInt(req.params.id);  
        const eliminado = await service.deleteEstado(idest);
        if (!eliminado) return res.status(404).json({ message: 'Estado no encontrado' });
        res.json({ message: 'Estado eliminado', data: eliminado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar estado' });
    }
};


