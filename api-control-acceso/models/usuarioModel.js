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

    getByEmail: (email, callback) => {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        db.query(sql, [email], callback);
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
                rol,
                nombre,
                apellido,
                numero_documento,
                telefono
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            data.email.toLowerCase(),
            data.password,
            data.rol,
            data.nombre,
            data.apellido,
            data.numero_documento,
            data.telefono || null
        ];

        console.log('Creating user with data:', {
            email: data.email,
            rol: data.rol,
            nombre: data.nombre,
            apellido: data.apellido,
            numero_documento: data.numero_documento,
            telefono: data.telefono,
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

    updateLastAccess: (userId, callback) => {
        const sql = 'UPDATE usuarios SET ultimo_acceso = CURRENT_TIMESTAMP WHERE id = ?';
        db.query(sql, [userId], callback);
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
    },

    findByDocumentoAndNombre: (documento, nombre, callback) => {
        const sql = `
            SELECT * FROM usuarios 
            WHERE numero_documento = ? 
            AND CONCAT(nombre, ' ', apellido) LIKE ?
        `;
        db.query(sql, [documento, `%${nombre}%`], callback);
    },

    updatePassword: (userId, newPassword, callback) => {
        const sql = 'UPDATE usuarios SET password = ? WHERE id = ?';
        db.query(sql, [newPassword, userId], callback);
    }
};

module.exports = Usuario;