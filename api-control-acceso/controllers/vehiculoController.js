const Vehiculo = require('../models/vehiculoModel');

const vehiculoController = {
  getAll: (req, res) => {
    Vehiculo.getAll((err, results) => {
      if (err) {
        console.error('Error al obtener los vehículos:', err);
        return res.status(500).json({ error: 'Error al obtener los vehículos' });
      }
      res.json(results);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Vehiculo.getById(id, (err, results) => {
      if (err) {
        console.error('Error al obtener el vehículo:', err);
        return res.status(500).json({ error: 'Error al obtener el vehículo' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Vehículo no encontrado' });
      }
      res.json(results[0]);
    });
  },

  create: (req, res) => {
    const newVehiculo = req.body;
    Vehiculo.create(newVehiculo, (err, result) => {
      if (err) {
        console.error('Error al crear el vehículo:', err);
        return res.status(500).json({ error: 'Error al crear el vehículo' });
      }
      res.status(201).json({ message: 'Vehículo creado correctamente', id: result.insertId });
    });
  },

  update: (req, res) => {
    const id = req.params.id;
    const updatedVehiculo = req.body;
    Vehiculo.update(id, updatedVehiculo, (err) => {
      if (err) {
        console.error('Error al actualizar el vehículo:', err);
        return res.status(500).json({ error: 'Error al actualizar el vehículo' });
      }
      res.json({ message: 'Vehículo actualizado correctamente' });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Vehiculo.delete(id, (err) => {
      if (err) {
        console.error('Error al eliminar el vehículo:', err);
        return res.status(500).json({ error: 'Error al eliminar el vehículo' });
      }
      res.json({ message: 'Vehículo eliminado correctamente' });
    });
  }
};

module.exports = vehiculoController;
