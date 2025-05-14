const Persona = require('../models/personaModel');

exports.getAll = (req, res) => {
    console.log('Solicitud GET recibida en /api/persona');
    Persona.getAll((err, results) => {
        if (err) {
            console.error('Error al obtener personas:', err);
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
};

exports.getById = (req, res) => {
    const id = req.params.id;
    Persona.getById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Persona no encontrada' });
        res.json(results[0]);
    });
};

exports.create = (req, res) => {
    const { nombre, apellido, documento_identidad, tipo_documento, telefono, correo, tipo } = req.body;

    // Validar campos obligatorios
    if (!nombre || !apellido || !documento_identidad || !tipo_documento || !tipo) {
        return res.status(400).json({ mensaje: 'Todos los campos obligatorios deben ser enviados' });
    }

    Persona.create({ nombre, apellido, documento_identidad, tipo_documento, telefono, correo, tipo }, (err, result) => {
        if (err) {
            console.error('Error al crear persona:', err);
            return res.status(500).json({ error: err });
        }
        res.status(201).json({ mensaje: 'Persona creada', id: result.insertId });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, documento_identidad, tipo_documento, telefono, correo, tipo } = req.body;

    // Validar campos obligatorios
    if (!nombre || !apellido || !documento_identidad || !tipo_documento || !tipo) {
        return res.status(400).json({ mensaje: 'Todos los campos obligatorios deben ser enviados' });
    }

    Persona.update(id, { nombre, apellido, documento_identidad, tipo_documento, telefono, correo, tipo }, (err) => {
        if (err) {
            console.error('Error al actualizar persona:', err);
            return res.status(500).json({ error: err });
        }
        res.json({ mensaje: 'Persona actualizada' });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Persona.delete(id, (err) => {
        if (err) {
            console.error('Error al eliminar persona:', err);
            return res.status(500).json({ error: err });
        }
        res.json({ mensaje: 'Persona eliminada' });
    });
};