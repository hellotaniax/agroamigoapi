const service = require('../services/app.tiposfertilizantes.service');
const asyncHandler = require('../utils/asynchandler.util');

// Listar todos los tipos
exports.getAll = asyncHandler(async (req, res) => {
  const tipos = await service.getTiposFertilizantes();
  res.json(tipos);
});

// Obtener tipo por ID
exports.getById = asyncHandler(async (req, res) => {
  const idtip = parseInt(req.params.id);
  const tipo = await service.getTipoFertilizanteById(idtip);

  if (!tipo) {
    const error = new Error('Tipo de fertilizante no encontrado');
    error.status = 404;
    throw error;
  }

  res.json(tipo);
});

// Crear tipo
exports.create = asyncHandler(async (req, res) => {
  const { nombretfer } = req.body;

  if (!nombretfer || nombretfer.trim() === '') {
    const error = new Error("El campo 'nombretfer' es obligatorio");
    error.status = 400;
    throw error;
  }

  const nuevo = await service.createTipoFertilizante(nombretfer);
  res.status(201).json(nuevo);
});

// Actualizar tipo
exports.update = asyncHandler(async (req, res) => {
  const idtip = parseInt(req.params.id);
  const { nombretfer } = req.body;

  if (!nombretfer || nombretfer.trim() === '') {
    const error = new Error("El campo 'nombretfer' es obligatorio");
    error.status = 400;
    throw error;
  }

  const actualizado = await service.updateTipoFertilizante(idtip, nombretfer);

  if (!actualizado) {
    const error = new Error('Tipo de fertilizante no encontrado');
    error.status = 404;
    throw error;
  }

  res.json(actualizado);
});

// Eliminar tipo
exports.delete = asyncHandler(async (req, res) => {
  const idtip = parseInt(req.params.id);
  const eliminado = await service.deleteTipoFertilizante(idtip);

  if (!eliminado) {
    const error = new Error('Tipo de fertilizante no encontrado');
    error.status = 404;
    throw error;
  }

  res.json({
    message: 'Tipo eliminado correctamente',
    data: eliminado
  });
});
