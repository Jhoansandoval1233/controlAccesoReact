const db = require('../config/db');

const ControlAcceso = {
  getAll: (callback) => {
    const query = 'SELECT * FROM registros';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM registros WHERE id_registro = ?';
    db.query(query, [id], callback);
  },

  create: (data, callback) => {
    const query = 'INSERT INTO registros SET ?';
    db.query(query, data, callback);
  },

  update: (id, data, callback) => {
    const query = 'UPDATE registros SET ? WHERE id_registro = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM registros WHERE id_registro = ?';
    db.query(query, [id], callback);
  }
};

module.exports = ControlAcceso;