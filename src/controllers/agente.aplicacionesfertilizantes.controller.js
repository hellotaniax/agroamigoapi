const service = require('../services/agente.aplicacionesfertilizantes.service');

/**
 * 1️⃣ Obtener lista de fertilizantes
 * GET /api/fertilizantes
 */
exports.obtenerFertilizantes = async (req, res) => {
  try {
    const data = await service.getFertilizantes();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener fertilizantes' });
  }
};

/**
 * 2️⃣ Obtener formas de aplicación por fertilizante
 * GET /api/fertilizantes/:fertilizante/formas
 */
exports.obtenerFormas = async (req, res) => {
  try {
    const { fertilizante } = req.params;
    const data = await service.getFormasPorFertilizante(fertilizante);

    if (!data.length) {
      return res.status(404).json({
        mensaje: 'No se encontraron formas de aplicación para este fertilizante'
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener formas de aplicación' });
  }
};

/**
 * 3️⃣ Obtener etapas según fertilizante y forma
 * GET /api/fertilizantes/:fertilizante/formas/:forma/etapas
 */
exports.obtenerEtapas = async (req, res) => {
  try {
    const { fertilizante, forma } = req.params;
    const data = await service.getEtapas(fertilizante, forma);

    if (!data.length) {
      return res.status(404).json({
        mensaje: 'No se encontraron etapas para esta combinación'
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener etapas' });
  }
};

/**
 * 4️⃣ Obtener recomendación final
 * GET /api/recomendacion?fertilizante=&forma=&etapa=
 */
exports.obtenerRecomendacion = async (req, res) => {
  try {
    const { fertilizante, forma, etapa } = req.query;

    if (!fertilizante || !forma || !etapa) {
      return res.status(400).json({
        error: 'Debe proporcionar fertilizante, forma y etapa'
      });
    }

    const data = await service.getRecomendacion(
      fertilizante,
      forma,
      etapa
    );

    if (!data) {
      return res.status(404).json({
        mensaje: 'No existe recomendación para esta combinación'
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener recomendación' });
  }
};

/**
 * 5️⃣ Buscar fertilizante por nombre (entrada libre del usuario)
 * GET /api/fertilizantes/buscar/:nombre
 */
exports.buscarFertilizante = async (req, res) => {
  try {
    const { nombre } = req.params;
    const data = await service.buscarFertilizante(nombre);

    if (!data.length) {
      return res.status(404).json({
        mensaje: 'No se encontraron fertilizantes con ese nombre'
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar fertilizante' });
  }
};

/**
 * 6️⃣ Validar forma de aplicación
 * GET /api/aplicaciones/validar/:forma
 */
exports.validarAplicacion = async (req, res) => {
  try {
    const { forma } = req.params;
    const valido = await service.esAplicacionValida(forma);

    if (!valido) {
      return res.json({
        valido: false,
        mensaje: 'La forma de aplicación no está soportada actualmente'
      });
    }

    res.json({
      valido: true,
      forma
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al validar aplicación' });
  }
};
