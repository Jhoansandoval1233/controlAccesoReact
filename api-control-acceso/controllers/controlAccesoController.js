const ControlAcceso = require('../models/controlAccesoModels'); // Asegúrate de tener la ruta correcta

const controlAccesoController = {
  getAll: (req, res) => {
    ControlAcceso.getAll((err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener los registros' });
      }
      res.status(200).json(result);
    });
  },

  getById: (req, res) => {
    const { id } = req.params;
    ControlAcceso.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener el registro' });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }
      res.status(200).json(result[0]);
    });
  },

  create: (req, res) => {
    const newData = req.body;
    ControlAcceso.create(newData, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al crear el registro' });
      }
      res.status(201).json({ message: 'Registro creado correctamente', id: result.insertId });
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    ControlAcceso.update(id, updateData, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al actualizar el registro' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }
      res.status(200).json({ message: 'Registro actualizado correctamente' });
    });
  },

  delete: (req, res) => {
    const { id } = req.params;
    ControlAcceso.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al eliminar el registro' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Registro no encontrado' });
      }
      res.status(200).json({ message: 'Registro eliminado correctamente' });
    });
  }
};

module.exports = controlAccesoController;