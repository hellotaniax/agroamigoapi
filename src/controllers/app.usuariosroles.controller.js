const urService = require('../services/app.usuariosroles.service');

// Asignar rol a usuario
exports.asignar = async (req, res) => {
  try {
    const { idusu, idrol } = req.body;
    const asignacion = await urService.asignarRol({ idusu, idrol });
    res.status(201).json(asignacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al asignar rol al usuario' });
  }
}

// Listar roles de un usuario
exports.getRolesPorUsuario = async (req, res) => {
  try {
    const idusu = parseInt(req.params.idusu);
    const roles = await urService.getRolesPorUsuario(idusu);
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener roles del usuario' });
  }
}

// Listar usuarios de un rol
exports.getUsuariosPorRol = async (req, res) => {
  try {
    const idrol = parseInt(req.params.idrol);
    const usuarios = await urService.getUsuariosPorRol(idrol);
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener usuarios del rol' });
  }
}

// Eliminar asignación
exports.eliminar = async (req, res) => {
  try {
    const { idusu, idrol } = req.params;
    const eliminado = await urService.eliminarAsignacion(idusu, idrol);
    if (!eliminado) return res.status(404).json({ message: 'Asignación no encontrada' });
    res.json({ message: 'Asignación eliminada', data: eliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar asignación' });
  }
}