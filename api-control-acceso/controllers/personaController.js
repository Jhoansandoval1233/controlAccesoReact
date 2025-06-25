const Persona = require('../models/personaModel');

exports.getAll = (req, res) => {
  console.log('Solicitud GET recibida en /api/persona');

  Persona.getAll((err, results) => {
    if (err) {
      console.error('Error al obtener personas:', err);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener las personas'
      });
    }

    const formattedResults = results.map(person => ({
      ...person,
      fecha_registro: new Date(person.fecha_registro)
        .toLocaleString('es-CO', {
          dateStyle: 'medium',
          timeStyle: 'medium'
        })
    }));

    res.status(200).json({
      success: true,
      data: formattedResults,
      total: formattedResults.length
    });
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

exports.getByDocumento = (req, res) => {
  const numero_documento = req.params.numero_documento;

  if (!numero_documento) {
    return res.status(400).json({
      mensaje: 'El número de documento es requerido'
    });
  }

  Persona.findByDocumento(numero_documento, (err, results) => {
    if (err) {
      console.error('Error al buscar persona por documento:', err);
      return res.status(500).json({ 
        error: 'Error al buscar persona' 
      });
    }

    if (results.length === 0) {
      return res.status(404).json({ 
        mensaje: 'Persona no encontrada',
        existe: false 
      });
    }

    res.json({
      mensaje: 'Persona encontrada',
      existe: true,
      persona: results[0]
    });
  });
};

exports.create = (req, res) => {
  const { 
    nombre, 
    apellido, 
    tipo_documento, 
    numero_documento, 
    telefono, 
    correo, 
    tipoRol  
  } = req.body;

  if (!nombre || !apellido || !tipo_documento || !numero_documento || !tipoRol) {
    return res.status(400).json({
      success: false,
      message: 'Todos los campos marcados son obligatorios'
    });
  }

  Persona.findByDocumento(numero_documento, (err, results) => {
    if (err) {
      console.error('Error al buscar documento:', err);
      return res.status(500).json({
        success: false,
        message: 'Error al verificar documento'
      });
    }

    if (results.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'El número de documento ya está registrado'
      });
    }

    Persona.create({
      nombre,
      apellido,
      tipo_documento,
      numero_documento,
      telefono,
      correo,
      tipo_rol: tipoRol  
    }, (createErr, result) => {
      if (createErr) {
        console.error('Error al crear persona:', createErr);
        return res.status(500).json({
          success: false,
          message: 'Error al crear el registro'
        });
      }

      res.status(201).json({
        success: true,
        message: 'Persona registrada exitosamente',
        id: result.insertId
      });
    });
  });
};

exports.update = (req, res) => {
  const numero_documento = req.params.numero_documento;
  const { nombre, apellido, tipo_documento, telefono, correo, tipo_rol } = req.body;

  if (!nombre || !apellido || !numero_documento || !tipo_documento || !tipo_rol) {
    return res.status(400).json({ mensaje: 'Todos los campos obligatorios deben ser enviados' });
  }

  Persona.updateByDocumento(numero_documento, {
    nombre, apellido, tipo_documento, telefono, correo, tipo_rol
  }, (err) => {
    if (err) {
      console.error('Error al actualizar persona:', err);
      return res.status(500).json({ error: err });
    }
    res.json({ mensaje: 'Persona actualizada' });
  });
};
exports.delete = (req, res) => {
  const numero_documento = req.params.numero_documento;

  Persona.deleteByDocumento(numero_documento, (err) => {
    if (err) {
      console.error('Error al eliminar persona:', err);
      return res.status(500).json({ error: 'Error al eliminar persona' });
    }

    res.json({ mensaje: 'Persona eliminada (inactivada)' });
  });
};
