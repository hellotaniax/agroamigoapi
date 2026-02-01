const service = require('../services/app.roles.service');

// Listar todos
exports.getAll = async (req, res) => {
  try {
    const roles = await service.getRoles();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener roles' });
  }
};

// Obtener por ID
exports.getById = async (req, res) => {
  try {
    const idrol = parseInt(req.params.id);
    const rol = await service.getRolById(idrol);
    if (!rol) return res.status(404).json({ message: 'Rol no encontrado' });
    res.json(rol);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener rol' });
  }
};

// Crear rol
exports.create = async (req, res) => {
  try {
    const { nombrerol, descripcionrol } = req.body;
    const nuevo = await service.createRol({ nombrerol, descripcionrol });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    if (error.code === '23505') {
      return res.status(400).json({ message: 'El nombre de rol ya existe' });
    }
    res.status(500).json({ message: 'Error al crear rol' });
  }
};

// Actualizar rol
exports.update = async (req, res) => {
  try {
    const idrol = parseInt(req.params.id);
    const { nombrerol, descripcionrol } = req.body;
    const actualizado = await service.updateRol(idrol, { nombrerol, descripcionrol });
    if (!actualizado) return res.status(404).json({ message: 'Rol no encontrado' });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    if (error.code === '23505') {
      return res.status(400).json({ message: 'El nombre de rol ya existe' });
    }
    res.status(500).json({ message: 'Error al actualizar rol' });
  }
};

// Eliminar rol
exports.delete = async (req, res) => {
  try {
    const idrol = parseInt(req.params.id);
    const eliminado = await service.deleteRol(idrol);
    if (!eliminado) return res.status(404).json({ message: 'Rol no encontrado' });
    res.json({ message: 'Rol eliminado', data: eliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar rol' });
  }
};