const db = require('../config/database');

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
  }
};

module.exports = Persona;