const db = require('../config/db');

const Persona = {
  create: (data, callback) => {
    const sql = `
      INSERT INTO personas (
        nombre,
        apellido,
        tipo_documento,
        numero_documento,
        telefono,
        correo,
        tipo_rol
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.nombre,
      data.apellido,
      data.tipo_documento,
      data.numero_documento,
      data.telefono,
      data.correo,
      data.tipo_rol
    ];

    db.query(sql, values, callback);
  },

  findByDocumento: (numero_documento, callback) => {
    const sql = 'SELECT * FROM personas WHERE numero_documento = ?';
    db.query(sql, [numero_documento], callback);
  },

  getAll: (callback) => {
    const sql = `
      SELECT 
        id,
        nombre,
        apellido,
        tipo_documento,
        numero_documento,
        telefono,
        correo,
        tipo_rol,
        activo,
        fecha_registro
      FROM personas 
      WHERE activo = 1
      ORDER BY fecha_registro DESC
    `;
    db.query(sql, callback);
  },
};

module.exports = Persona;