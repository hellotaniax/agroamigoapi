const service = require('../services/app.cultivosfertilizantes.service');

// Asignar fertilizante a cultivo
exports.asignar = async (req, res) => {
  try {
    const { idcul, idfer, observacioncfe } = req.body;
    const asignacion = await service.asignarFertilizante({ idcul, idfer, observacioncfe });
    res.status(201).json(asignacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al asignar fertilizante al cultivo' });
  }
};

// Listar fertilizantes de un cultivo
exports.getFertilizantesPorCultivo = async (req, res) => {
  try {
    const idcul = parseInt(req.params.idcul);
    const fertilizantes = await service.getFertilizantesPorCultivo(idcul);
    res.json(fertilizantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener fertilizantes del cultivo' });
  }
};

// Listar cultivos de un fertilizante
exports.getCultivosPorFertilizante = async (req, res) => {
  try {
    const idfer = parseInt(req.params.idfer);
    const cultivos = await service.getCultivosPorFertilizante(idfer);
    res.json(cultivos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener cultivos del fertilizante' });
  }
};

// Actualizar observación
exports.actualizarObservacion = async (req, res) => {
  try {
    const idcul = parseInt(req.params.idcul);
    const idfer = parseInt(req.params.idfer);
    const { observacioncfe } = req.body;
    const actualizado = await service.actualizarObservacion(idcul, idfer, observacioncfe);
    if (!actualizado) return res.status(404).json({ message: 'Relación no encontrada' });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar observación' });
  }
};

// Eliminar relación
exports.eliminar = async (req, res) => {
  try {
    const idcul = parseInt(req.params.idcul);
    const idfer = parseInt(req.params.idfer);
    const eliminado = await service.eliminarFertilizante(idcul, idfer);
    if (!eliminado) return res.status(404).json({ message: 'Relación no encontrada' });
    res.json({ message: 'Relación eliminada', data: eliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar relación' });
  }
};