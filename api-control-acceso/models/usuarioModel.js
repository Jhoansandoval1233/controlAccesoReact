const db = require('../config/db');

const Usuario = {
    getAll: (callback) => {
        const sql = 'SELECT id, email, rol, fecha_creacion, ultimo_acceso FROM usuarios';
        db.query(sql, callback);
    },

    getById: (id, callback) => {
        const sql = 'SELECT id, email, rol, fecha_creacion, ultimo_acceso FROM usuarios WHERE id = ?';
        db.query(sql, [id], callback);
    },

    create: (data, callback) => {
        // Validar rol 
        const rolesValidos = ['admin', 'usuario'];
        if (!rolesValidos.includes(data.rol)) {
            return callback(new Error('Rol inválido'));
        }

        const sql = `
            INSERT INTO usuarios (
                email,
                password,
                rol
            ) VALUES (?, ?, ?)
        `;

        const values = [
            data.email.toLowerCase(),
            data.password,
            data.rol
        ];

        console.log('Creating user with data:', {
            ...values,
            password: '[PROTECTED]'
        });

        db.query(sql, values, (error, results) => {
            if (error) {
                console.error('Error creating user:', error);
                return callback(error);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const sql = 'DELETE FROM usuarios WHERE id = ?';
        db.query(sql, [id], (error, results) => {
            if (error) {
                console.error('Error deleting user:', error);
                return callback(error);
            }
            callback(null, results);
        });
    }
};

module.exports = Usuario;