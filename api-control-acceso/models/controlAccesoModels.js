const db = require('../config/db');

const ControlAcceso = {
  getAll: (callback) => {
    const query = `
      SELECT 
        p.numero_documento,
        r.fecha_hora_ingreso,
        r.fecha_hora_salida,
        CONCAT(p.nombre, ' ', p.apellido) as nombre_completo,
        p.tipo_rol,
        r.observaciones
      FROM registros r
      INNER JOIN personas p ON r.persona_id = p.id
      WHERE p.activo = 1
      ORDER BY 
        COALESCE(r.fecha_hora_salida, r.fecha_hora_ingreso) DESC
      LIMIT 10
    `;
    db.query(query, callback);
  },

  create: (data, callback) => {
    const sql = `
      INSERT INTO registros (
        persona_id,
        fecha_hora_ingreso,
        vehiculo_id,
        elemento_id,
        observaciones
      ) VALUES (?, NOW(), ?, ?, ?)
    `;

    const values = [
      data.persona_id,
      data.vehiculo_id || null,
      data.elemento_id || null,
      data.observaciones || null
    ];

    db.query(sql, values, callback);
  },

  // Para registrar la salida
  updateSalida: (registroId, callback) => {
    const sql = `
      UPDATE registros 
      SET fecha_hora_salida = NOW()
      WHERE id = ?
    `;
    
    db.query(sql, [registroId], callback);
  }
};

module.exports = ControlAcceso;