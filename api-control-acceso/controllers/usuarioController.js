const Usuario = require('../models/usuarioModel');

exports.getUsuarios = (req, res) => {
  Usuario.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getUsuarioById = (req, res) => {
  const id = req.params.id;
  Usuario.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(result[0]);
  });
};

exports.createUsuario = (req, res) => {
    console.log('Request body:', req.body);

    // Validar si el cuerpo de la solicitud está vacío
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'El cuerpo de la solicitud está vacío'
        });
    }

    const { email, password, rol } = req.body;

    // Validar campos requeridos
    if (!email || !password || !rol) {
        return res.status(400).json({
            error: 'Todos los campos son requeridos',
            received: {
                email: !!email,
                password: !!password,
                rol: !!rol
            }
        });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: 'Formato de email inválido'
        });
    }

    // Validar valores enumerados de rol
    const rolesValidos = ['admin', 'usuario'];
    if (!rolesValidos.includes(rol)) {
        return res.status(400).json({
            error: 'Rol inválido',
            permitidos: rolesValidos,
            recibido: rol
        });
    }

    const nuevoUsuario = {
        email,
        password, 
        rol
        // fecha_creacion y ultimo_acceso los maneja MySQL
    };

    Usuario.create(nuevoUsuario, (err, result) => {
        if (err) {
            console.error('Error al crear usuario:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ 
                    error: 'El email ya está registrado' 
                });
            }
            return res.status(500).json({ 
                error: 'Error al crear el usuario' 
            });
        }
        
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            id: result.insertId,
            usuario: {
                ...nuevoUsuario,
                password: undefined 
            }
        });
    });
};

exports.updateUsuario = (req, res) => {
  const id = req.params.id;
  const usuarioActualizado = req.body;
  Usuario.update(id, usuarioActualizado, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuario actualizado' });
  });
};

exports.deleteUsuario = (req, res) => {
  const id = req.params.id;
  Usuario.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuario eliminado' });
  });
};