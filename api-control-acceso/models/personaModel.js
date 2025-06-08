const db = require('../config/db');

const Persona = {
    getAll: (callback) => {
        const sql = 'SELECT * FROM personas';
        db.query(sql, callback);
    },
    getById: (id, callback) => {
        const sql = 'SELECT * FROM personas WHERE id = ?';
        db.query(sql, [id], callback);
    },
    create: (data, callback) => {
        const sql = `
            INSERT INTO personas (
                nombre, 
                apellido, 
                tipo_documento, 
                numero_documento, 
                telefono, 
                correo, 
                tipo_rol,
                activo
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;  
    
        const values = [
            data.nombre,
            data.apellido,
            data.tipo_documento,
            data.numero_documento,
            data.telefono || null,
            data.correo || null,
            data.tipo_rol,
            1  // Asumiendo que 'activo' es un campo booleano y por defecto es 1 (activo)
        ];
        
        console.log('SQL Values:', values);
        db.query(sql, values, callback);
    },
    update: (id, data, callback) => {
        const sql = `
            UPDATE personas
            SET nombre = ?, apellido = ?, numero_documento = ?, tipo_documento = ?, telefono = ?, correo = ?, tipo_rol = ?
            WHERE id = ?
        `;
        const values = [
            data.nombre,
            data.apellido,
            data.numero_documento,
            data.tipo_documento,
            data.telefono || null,
            data.correo || null,
            data.tipo_rol,
            id
        ];
        db.query(sql, values, callback);
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM personas WHERE id = ?';
        db.query(sql, [id], callback);
    },
    getByDocumento: (numero_documento, callback) => {
        const sql = 'SELECT * FROM personas WHERE numero_documento = ?';
        console.log('Buscando documento:', numero_documento);
        db.query(sql, [numero_documento], callback);
    }
};

module.exports = Persona;