const ControlAcceso = require('../models/controlAccesoModels');
const Vehiculo = require('../models/vehiculoModel');
const Elemento = require('../models/elementoModel');

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

  create: async (req, res) => {
    const { 
      persona_id, 
      tipo_movimiento, 
      fecha_hora,
      vehiculo,
      elemento
    } = req.body;

    // Validar campos requeridos
    if (!persona_id || !tipo_movimiento) {
      return res.status(400).json({ 
        error: 'persona_id y tipo_movimiento son requeridos' 
      });
    }

    try {
      // Crear metodo de acceso
      ControlAcceso.create({
        persona_id,
        tipo_movimiento,
        fecha_hora: fecha_hora || new Date()
      }, async (err, result) => {
        if (err) {
          console.error('Error creating access record:', err);
          return res.status(500).json({ 
            error: 'Error al crear el registro' 
          });
        }

        const registro_id = result.insertId;
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

        // Actualizar registro de acceso con IDs relacionados si es necesario
        if (vehiculoId || elementoId) {
          const updateData = {};
          if (vehiculoId) updateData.vehiculo_id = vehiculoId;
          if (elementoId) updateData.elemento_id = elementoId;

          ControlAcceso.update(registro_id, updateData, (updateErr) => {
            if (updateErr) {
              console.error('Error updating references:', updateErr);
            }
          });
        }

        res.status(201).json({ 
          success: true,
          message: 'Registro creado correctamente', 
          id: registro_id,
          vehiculo_id: vehiculoId,
          elemento_id: elementoId
        });
      });

    } catch (error) {
      console.error('Error in create controller:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor' 
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