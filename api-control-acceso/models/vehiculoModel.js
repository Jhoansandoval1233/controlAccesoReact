const db = require('../config/db');

const Vehiculo = {
  getAll: (callback) => {
    db.query('SELECT * FROM vehiculo', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM vehiculo WHERE id_vehiculo = ?', [id], callback);
  },

  create: (data, callback) => {
    const { placa, tipo, id_persona } = data;
    db.query(
      'INSERT INTO vehiculo (placa, tipo, id_persona) VALUES (?, ?, ?)',
      [placa, tipo, id_persona],
      callback
    );
  },

  update: (id, data, callback) => {
    const { placa, tipo, id_persona } = data;
    db.query(
      'UPDATE vehiculo SET placa = ?, tipo = ?, id_persona = ? WHERE id_vehiculo = ?',
      [placa, tipo, id_persona, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM vehiculo WHERE id_vehiculo = ?', [id], callback);
  }
};

module.exports = Vehiculo;