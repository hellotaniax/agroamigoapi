const service = require('../services/app.usuarios.service');

// Listar todos
exports.getAll = async (req, res) => {
  try {
    const usuarios = await service.getUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// Obtener por ID
exports.getById = async (req, res) => {
  try {
    const idusu = parseInt(req.params.id);
    const usuario = await service.getUsuarioById(idusu);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
};

// Crear usuario
exports.create = async (req, res) => {
  try {
    const { nombreusu, emailusu, passwordusu, idest } = req.body;
    const nuevo = await service.createUsuario({ nombreusu, emailusu, passwordusu, idest });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    if (error.code === '23505') { // violación de UNIQUE
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }
    res.status(500).json({ message: 'Error al crear usuario' });
  }
};

// Actualizar usuario
exports.update = async (req, res) => {
  try {
    const idusu = parseInt(req.params.id);
    const { nombreusu, emailusu, passwordusu, idest } = req.body;
    const actualizado = await service.updateUsuario(idusu, { nombreusu, emailusu, passwordusu, idest });
    if (!actualizado) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    if (error.code === '23505') {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

// Eliminar usuario
exports.delete = async (req, res) => {
  try {
    const idusu = parseInt(req.params.id);
    const eliminado = await service.deleteUsuario(idusu);
    if (!eliminado) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado', data: eliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};