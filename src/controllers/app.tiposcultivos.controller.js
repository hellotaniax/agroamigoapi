const service = require('../services/app.tiposcultivos.service');

// Listar todos los tipos de cultivo
exports.getAll = async (req, res) => {
  try {
    const tipos = await service.getTiposCultivos();
    res.json(tipos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener tipos de cultivo' });
  }
};

// Obtener tipo de cultivo por ID
exports.getById = async (req, res) => {
    try {
        const idtcul = parseInt(req.params.id);
        const tipocul = await service.getTipoCultivoById(idtcul);
        if (!tipocul) return res.status(404).json({ message: 'Tipo de cultivo no encontrado' });
        res.json(tipocul);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener tipo de cultivo' });
    }
};

// Crear nuevo tipo de cultivo
exports.create = async (req, res) => {
    try {
        const { nombretcul } = req.body;
        const nuevo = await service.createTipoCultivo(nombretcul);
        res.status(201).json(nuevo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear tipo de cultivo' });
    }   
};

// Actualizar tipo de cultivo
exports.update = async (req, res) => {
    try {
        const idtcul = parseInt(req.params.id);
        const { nombretcul } = req.body;
        const actualizado = await service.updateTipoCultivo(idtcul, nombretcul);
        if (!actualizado) return res.status(404).json({ message: 'Tipo de cultivo no encontrado' });
        res.json(actualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar tipo de cultivo' });
    }
};

// Eliminar tipo de cultivo
exports.delete = async (req, res) => {
    try {
        const idtcul = parseInt(req.params.id);
        const eliminado = await service.deleteTipoCultivo(idtcul);
        if (!eliminado) return res.status(404).json({ message: 'Tipo de cultivo no encontrado' });
        res.json({ message: 'Tipo de cultivo eliminado', data: eliminado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar tipo de cultivo' });
    }
};