const db = require('../config/db');

const ControlAcceso = {
  getAll: (callback) => {
    const query = 'SELECT * FROM control_acceso';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM control_acceso WHERE id_control_acceso = ?';
    db.query(query, [id], callback);
  },

  create: (data, callback) => {
    const query = 'INSERT INTO control_acceso SET ?';
    db.query(query, data, callback);
  },

  update: (id, data, callback) => {
    const query = 'UPDATE control_acceso SET ? WHERE id_control_acceso = ?';
    db.query(query, [data, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM control_acceso WHERE id_control_acceso = ?';
    db.query(query, [id], callback);
  }
};

module.exports = ControlAcceso;