const db = require('../config/db');

const Usuario = {
  getAll: (callback) => {
    db.query('SELECT * FROM usuario', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id], callback);
  },

  create: (usuario, callback) => {
    const {
      nombre,
      apellido,
      correo,
      contraseña,
      rol,
      estado,
      documento_identidad,
      tipo_documento
    } = usuario;

    db.query(
      `INSERT INTO usuario (nombre, apellido, correo, contraseña, rol, estado, documento_identidad, tipo_documento)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, apellido, correo, contraseña, rol, estado ?? 1, documento_identidad, tipo_documento],
      callback
    );
  },

  update: (id, usuario, callback) => {
    const {
      nombre,
      apellido,
      correo,
      contraseña,
      rol,
      estado,
      documento_identidad,
      tipo_documento
    } = usuario;

    db.query(
      `UPDATE usuario SET nombre = ?, apellido = ?, correo = ?, contraseña = ?, rol = ?, estado = ?, documento_identidad = ?, tipo_documento = ?
       WHERE id_usuario = ?`,
      [nombre, apellido, correo, contraseña, rol, estado, documento_identidad, tipo_documento, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM usuario WHERE id_usuario = ?', [id], callback);
  }
};

module.exports = Usuario;