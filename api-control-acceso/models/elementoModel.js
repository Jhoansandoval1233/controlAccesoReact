const db = require('../config/db');

const Elemento = {
  getAll: (callback) => {
    db.query('SELECT * FROM elemento', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM elemento WHERE id_elemento = ?', [id], callback);
  },

  create: (data, callback) => {
    const { nombre, descripcion, serial, id_persona } = data;
    db.query(
      'INSERT INTO elemento (nombre, descripcion, serial, id_persona) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, serial, id_persona],
      callback
    );
  },

  update: (id, data, callback) => {
    const { nombre, descripcion, serial, id_persona } = data;
    db.query(
      'UPDATE elemento SET nombre = ?, descripcion = ?, serial = ?, id_persona = ? WHERE id_elemento = ?',
      [nombre, descripcion, serial, id_persona, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM elemento WHERE id_elemento = ?', [id], callback);
  }
};

module.exports = Elemento;
