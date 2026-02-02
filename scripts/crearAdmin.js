require('dotenv').config(); // <- agregar al principio

const { createUsuario } = require('../src/services/app.usuarios.service');

async function crearAdmin() {
  try {
    const admin = await createUsuario({
      nombreusu: 'Administrador General',
      emailusu: 'admin@agroamigo.com',
      passwordusu: 'MiNuevaPassword123',
      idest: 1
    });
    console.log('Admin creado:', admin);
    process.exit(0);
  } catch (error) {
    console.error('Error creando admin:', error);
    process.exit(1);
  }
}

crearAdmin();