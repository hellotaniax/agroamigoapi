// 1. Aquí lo defines como 'service'
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
    // Nota: Si tus IDs son 'USU-0001', no uses parseInt, déjalo como string
    const idusu = req.params.id; 
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
        const data = req.body; 

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "No se enviaron datos" });
        }

        // CORRECCIÓN: Se usa 'service' para coincidir con la línea 1
        const nuevoUsuario = await service.createUsuario(data);

        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error("Error en controlador:", error);
        res.status(500).json({ message: "Error al crear usuario" });
    }
};

// Actualizar usuario
exports.update = async (req, res) => {
  try {
    const idusu = req.params.id;
    // Agregamos apellidosusu e idrol que faltaban en tu desestructuración
    const { nombreusu, apellidosusu, emailusu, passwordusu, idest, idrol } = req.body;
    
    const actualizado = await service.updateUsuario(idusu, { 
        nombreusu, 
        apellidosusu, 
        emailusu, 
        passwordusu, 
        idest, 
        idrol 
    });
    
    if (!actualizado) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

// Eliminar usuario
exports.delete = async (req, res) => {
  try {
    const idusu = req.params.id;
    const eliminado = await service.deleteUsuario(idusu);
    if (!eliminado) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado', data: eliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};