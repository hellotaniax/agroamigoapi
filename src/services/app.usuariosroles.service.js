const db = require('../config/dbapp');

// Asignar rol a usuario
exports.asignarRol = async ({ idusu, idrol }) => {
  const { rows } = await db.query(
    `INSERT INTO usuario_roles (idusu, idrol)
     VALUES ($1, $2)
     RETURNING *`,
    [idusu, idrol]
  );
  return rows[0];
}

// Listar roles de un usuario
exports.getRolesPorUsuario = async (idusu) => {
  const { rows } = await db.query(
    `SELECT r.idrol, r.nombrerol, r.descripcionrol
     FROM usuario_roles ur
     JOIN roles r ON ur.idrol = r.idrol
     WHERE ur.idusu = $1`,
    [idusu]
  );
  return rows;
}

// Listar usuarios de un rol
exports.getUsuariosPorRol = async (idrol) => {
  const { rows } = await db.query(
    `SELECT u.idusu, u.nombreusu, u.emailusu, u.idest, u.createdatusu
     FROM usuario_roles ur
     JOIN usuarios u ON ur.idusu = u.idusu
     WHERE ur.idrol = $1`,
    [idrol]
  );
  return rows;
}

// Eliminar asignación
exports.eliminarAsignacion = async (idusu, idrol) => {
  const { rows } = await db.query(
    `DELETE FROM usuario_roles
     WHERE idusu = $1 AND idrol = $2
     RETURNING *`,
    [idusu, idrol]
  );
  return rows[0];
}