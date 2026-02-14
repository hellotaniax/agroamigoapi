const db = require('../config/admindb');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
exports.getUsuarios = async () => {
  const { rows } = await db.query(
    `SELECT idusu, nombreusu, apellidosusu, emailusu, idest, idrol, creacionusu
     FROM usuarios
     ORDER BY nombreusu`
  ); 
  return rows;
}

// Obtener usuario por ID
exports.getUsuarioById = async (idusu) => {
  const { rows } = await db.query(
    `SELECT idusu, nombreusu, apellidosusu, emailusu, idest, idrol, creacionusu
     FROM usuarios
     WHERE idusu = $1`,
    [idusu]
  );
  return rows[0];
}

// Recibe un objeto (data), NO req ni res
exports.createUsuario = async ({ nombreusu, apellidosusu, emailusu, passwordusu, idest, idrol }) => {
    
    // Validar que los campos obligatorios existan antes de procesar
    if (!nombreusu || !emailusu || !passwordusu) {
        throw new Error("Faltan campos obligatorios en el servicio");
    }

    const hashedPassword = await bcrypt.hash(passwordusu, 10);

    const { rows } = await db.query(
        `INSERT INTO usuarios (nombreusu, apellidosusu, emailusu, contraseniausu, idest, idrol)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING idusu, nombreusu, emailusu, idest, idrol, creacionusu`,
        [nombreusu, apellidosusu, emailusu, hashedPassword, parseInt(idest), parseInt(idrol)]
    );

    return rows[0];
};

// Actualizar usuario
exports.updateUsuario = async (idusu, { nombreusu, apellidosusu, emailusu, passwordusu, idest, idrol }) => {
  let query, params;

  if (passwordusu) {
    const hashedPassword = await bcrypt.hash(passwordusu, 10);
    query = `UPDATE usuarios
             SET nombreusu = $1, apellidosusu = $2, emailusu = $3, contraseniausu = $4, idest = $5, idrol = $6
             WHERE idusu = $7
             RETURNING idusu, nombreusu, emailusu, idest, idrol, creacionusu`;
    params = [nombreusu, apellidosusu, emailusu, hashedPassword, parseInt(idest), parseInt(idrol), idusu];
  } else {
    query = `UPDATE usuarios
             SET nombreusu = $1, apellidosusu = $2, emailusu = $3, idest = $4, idrol = $5
             WHERE idusu = $6
             RETURNING idusu, nombreusu, emailusu, idest, idrol, creacionusu`;
    params = [nombreusu, apellidosusu, emailusu, parseInt(idest), parseInt(idrol), idusu];
  }
  const { rows } = await db.query(query, params);
  return rows[0];
}

// Eliminar usuario
exports.deleteUsuario = async (idusu) => {
  const { rows } = await db.query(
    `DELETE FROM usuarios WHERE idusu = $1 RETURNING idusu`,
    [idusu]
  );
  return rows[0];
}