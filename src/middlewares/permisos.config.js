
const verificarToken = require('./auth.middleware');
const verificarRol = require('./verificarrol');

const permisos = {
  // Lectura - Admin, agrónomo e investigador
  todos: [
    verificarToken,
    verificarRol('Admin', 'Agrónomo', 'Investigador')
  ],

  agronomo: [
    verificarToken,
    verificarRol('Agrónomo', 'Admin')
  ],

    investigador: [
    verificarToken,
    verificarRol('Investigador', 'Admin')
  ],
  
  admin: [
    verificarToken,
    verificarRol('Admin')
  ]
};

module.exports = permisos;