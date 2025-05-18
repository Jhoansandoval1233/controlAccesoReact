const db = require('../config/db');

const Vehiculo = {
    getAll: (callback) => {
        db.query('SELECT * FROM vehiculos', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM vehiculos WHERE id = ?', [id], callback);
    },

    create: (data, callback) => {
        const { placa, tipo_vehiculo } = data;

        // Validar que los campos requeridos existan
        if (!placa || !tipo_vehiculo) {
            const error = new Error('Placa y tipo_vehiculo son requeridos');
            return callback(error);
        }

        const sql = 'INSERT INTO vehiculos (placa, tipo_vehiculo) VALUES (?, ?)';
        const values = [
            placa.substring(0, 10), // Asegurar máximo 10 caracteres
            tipo_vehiculo
        ];

        console.log('SQL Query:', sql);
        console.log('Values:', values);

        db.query(sql, values, callback);
    },

    update: (id, data, callback) => {
        const { placa, tipo_vehiculo } = data;

        const sql = 'UPDATE vehiculos SET placa = ?, tipo_vehiculo = ? WHERE id = ?';
        const values = [
            placa.substring(0, 10), // Asegurar máximo 10 caracteres
            tipo_vehiculo,
            id
        ];

        db.query(sql, values, callback);
    },

    delete: (id, callback) => {
        db.query('DELETE FROM vehiculos WHERE id = ?', [id], callback);
    }
};

module.exports = Vehiculo;