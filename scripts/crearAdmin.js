require('dotenv').config();

const { createUsuario } = require('../src/services/app.usuarios.service');

async function crearAdmin() {
  try {
    const admin = await createUsuario({
      nombreusu: 'Admin',
      apellidosusu: 'General',     // Requerido (NOT NULL en tu DB)
      emailusu: 'admin@agroamigo.com',
      passwordusu: 'MiNuevaPassword123',
      idrol: 2,                    // Requerido por la nueva relación de roles
      idest: 1                     // Estado (ej: Activo)
    });
    console.log('Admin creado correctamente:', admin);
    process.exit(0);
  } catch (error) {
    console.error('Error creando admin:', error.message);
    process.exit(1);
  }
}

crearAdmin();