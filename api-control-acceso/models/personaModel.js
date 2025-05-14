const db = require('../config/db');

const Persona = {
    getAll: (callback) => {
        const sql = 'SELECT * FROM persona';
        db.query(sql, callback);
    },
    getById: (id, callback) => {
        const sql = 'SELECT * FROM persona WHERE id_persona = ?';
        db.query(sql, [id], callback);
    },
    create: (data, callback) => {
        const sql = `
            INSERT INTO persona (nombre, apellido, documento_identidad, tipo_documento, telefono, correo, tipo)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.nombre,
            data.apellido,
            data.documento_identidad,
            data.tipo_documento,
            data.telefono || null,
            data.correo || null,
            data.tipo
        ];
        db.query(sql, values, callback);
    },
    update: (id, data, callback) => {
        const sql = `
            UPDATE persona
            SET nombre = ?, apellido = ?, documento_identidad = ?, tipo_documento = ?, telefono = ?, correo = ?, tipo = ?
            WHERE id_persona = ?
        `;
        const values = [
            data.nombre,
            data.apellido,
            data.documento_identidad,
            data.tipo_documento,
            data.telefono || null,
            data.correo || null,
            data.tipo,
            id
        ];
        db.query(sql, values, callback);
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM persona WHERE id_persona = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Persona;