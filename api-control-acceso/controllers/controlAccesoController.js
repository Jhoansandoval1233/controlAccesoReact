const ControlAcceso = require('../models/controlAccesoModels');
const Vehiculo = require('../models/vehiculoModel');
const Elemento = require('../models/elementoModel');

const controlAccesoController = {
  getAll: (req, res) => {
    ControlAcceso.getAll((err, results) => {
      if (err) {
        console.error('Error al obtener registros:', err);
        return res.status(500).json({ 
          success: false,
          message: 'Error al obtener los registros'
        });
      }

      const formattedResults = results.map(record => ({
        ...record,
        fecha_hora_ingreso: new Date(record.fecha_hora_ingreso)
          .toLocaleString('es-CO', {
            dateStyle: 'medium',
            timeStyle: 'medium'
          }),
        fecha_hora_salida: record.fecha_hora_salida 
          ? new Date(record.fecha_hora_salida).toLocaleString('es-CO', {
              dateStyle: 'medium',
              timeStyle: 'medium'
            })
          : 'Pendiente'
      }));

      res.status(200).json({
        success: true,
        data: formattedResults,
        total: formattedResults.length
      });
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

  create: async (req, res) => {
    const { 
      persona_id, 
      observaciones,
      vehiculo,
      elemento
    } = req.body;

    if (!persona_id) {
      return res.status(400).json({ 
        success: false,
        message: 'El ID de la persona es requerido'
      });
    }

    try {
      let vehiculoId = null;
      let elementoId = null;

      // Manejar vehículo si está presente
      if (vehiculo && vehiculo.placa && vehiculo.tipo_vehiculo) {
        try {
          const vehiculoResult = await new Promise((resolve, reject) => {
            Vehiculo.create(vehiculo, (err, result) => {
              if (err) reject(err);
              else resolve(result);
            });
          });
          vehiculoId = vehiculoResult.insertId;
        } catch (error) {
          console.error('Error creating vehicle:', error);
        }
      }

      // Manejar elemento si está presente
      if (elemento && elemento.tipo_elemento && elemento.serial) {
        try {
          const elementoResult = await new Promise((resolve, reject) => {
            Elemento.create(elemento, (err, result) => {
              if (err) reject(err);
              else resolve(result);
            });
          });
          elementoId = elementoResult.insertId;
        } catch (error) {
          console.error('Error creating element:', error);
        }
      }

      ControlAcceso.create({
        persona_id,
        observaciones,
        vehiculo_id: vehiculoId,
        elemento_id: elementoId
      }, (err, result) => {
        if (err) {
          console.error('Error al crear registro:', err);
          return res.status(500).json({ 
            success: false,
            message: 'Error al crear el registro'
          });
        }

        res.status(201).json({
          success: true,
          message: 'Registro creado correctamente',
          id: result.insertId
        });
      });

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
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