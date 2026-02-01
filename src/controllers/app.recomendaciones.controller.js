const service = require('../services/app.recomendaciones.service');

exports.getRecomendaciones = async (req, res) => {
  try {
    const data = await service.getRecomendaciones();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecomendacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const rec = await service.getRecomendacionById(id);

    if (!rec) {
      return res.status(404).json({ message: 'Recomendación no encontrada' });
    }

    res.json(rec);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRecomendacion = async (req, res) => {
  try {
    const newRec = await service.createRecomendacion(req.body);
    res.status(201).json(newRec);
  } catch (error) {
    // Código 23503: Foreign Key Violation (si mandas un idest o idpri que no existen)
    if (error.code === '23503') {
        return res.status(400).json({ 
            error: 'Error de referencia: Verifica que el idest (Estado) y el idpri (Prioridad) existan.' 
        });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.updateRecomendacion = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRec = await service.updateRecomendacion(id, req.body);

    if (!updatedRec) {
      return res.status(404).json({ message: 'Recomendación no encontrada' });
    }

    res.json(updatedRec);
  } catch (error) {
    if (error.code === '23503') {
        return res.status(400).json({ 
            error: 'Error de referencia: Verifica que el idest (Estado) y el idpri (Prioridad) existan.' 
        });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRecomendacion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.deleteRecomendacion(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Recomendación no encontrada' });
    }

    res.json({ message: 'Recomendación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};