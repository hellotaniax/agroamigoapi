const db = require('../config/admindb');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
exports.getUsuarios = async () => {
  const { rows } = await db.query(
    `SELECT idusu, nombreusu, emailusu, idest, createdatusu
     FROM usuarios
     ORDER BY nombreusu`
  );
  return rows;
}

// Obtener usuario por ID
exports.getUsuarioById = async (idusu) => {
  const { rows } = await db.query(
    `SELECT idusu, nombreusu, emailusu, idest, createdatusu
     FROM usuarios
     WHERE idusu = $1`,
    [idusu]
  );
  return rows[0];
}

// Crear usuario (con hash de contraseña)
exports.createUsuario = async ({ nombreusu, emailusu, passwordusu, idest }) => {
  const hashedPassword = await bcrypt.hash(passwordusu, 10);
  const { rows } = await db.query(
    `INSERT INTO usuarios (nombreusu, emailusu, passwordusu, idest)
     VALUES ($1, $2, $3, $4)
     RETURNING idusu, nombreusu, emailusu, idest, createdatusu`,
    [nombreusu, emailusu, hashedPassword, idest]
  );
  return rows[0];
}

// Actualizar usuario
exports.updateUsuario = async (idusu, { nombreusu, emailusu, passwordusu, idest }) => {
  let query, params;

  if (passwordusu) {
    const hashedPassword = await bcrypt.hash(passwordusu, 10);
    query = `UPDATE usuarios
             SET nombreusu = $1, emailusu = $2, passwordusu = $3, idest = $4
             WHERE idusu = $5
             RETURNING idusu, nombreusu, emailusu, idest, createdatusu`;
    params = [nombreusu, emailusu, hashedPassword, idest, idusu];
  } else {
    query = `UPDATE usuarios
             SET nombreusu = $1, emailusu = $2, idest = $3
             WHERE idusu = $4
             RETURNING idusu, nombreusu, emailusu, idest, createdatusu`;
    params = [nombreusu, emailusu, idest, idusu];
  }

  const { rows } = await db.query(query, params);
  return rows[0];
}

// Eliminar usuario
exports.deleteUsuario = async (idusu) => {
  const { rows } = await db.query(
    `DELETE FROM usuarios
     WHERE idusu = $1
     RETURNING idusu, nombreusu, emailusu, idest, createdatusu`,
    [idusu]
  );
  return rows[0];
}