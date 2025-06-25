const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt');

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

exports.createUsuario = async (req, res) => {
    console.log('Request body:', req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío' });
    }

    const { email, password, rol } = req.body;

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Formato de email inválido' });
    }

    const rolesValidos = ['admin', 'usuario'];
    if (!rolesValidos.includes(rol)) {
        return res.status(400).json({ error: 'Rol inválido', permitidos: rolesValidos, recibido: rol });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = {
            email,
            password: hashedPassword,
            rol
        };

        Usuario.create(nuevoUsuario, (err, result) => {
            if (err) {
                console.error('Error al crear usuario:', err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'El email ya está registrado' });
                }
                return res.status(500).json({ error: 'Error al crear el usuario' });
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
    } catch (err) {
        console.error('Error en hashing o creación:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
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

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Validar campos requeridos
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email y contraseña son requeridos'
        });
    }

    try {
        // Buscar usuario por email
        Usuario.getByEmail(email, async (err, results) => {
            if (err) {
                console.error('Error en login:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Error al verificar credenciales'
                });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }

            const user = results[0];

            // ✅ Comparar contraseña con bcrypt
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }

            // ✅ Login exitoso
            Usuario.updateLastAccess(user.id, (updateErr) => {
                if (updateErr) {
                    console.error('Error actualizando último acceso:', updateErr);
                }
            });

            return res.json({
                success: true,
                message: 'Login exitoso',
                token: 'abc123', // si usas JWT, reemplaza esto por jwt.sign(...)
                user: {
                    id: user.id,
                    email: user.email,
                    rol: user.rol
                }
            });
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            success: false,
            message: 'Error al procesar la solicitud'
        });
    }
};


exports.registro = async (req, res) => {
    console.log('Request body:', req.body);

    const { 
        nombre, 
        apellido, 
        numero_documento, 
        telefono, 
        email,  
        rol, 
        password 
    } = req.body;

    // Validar campos requeridos
    if (!nombre || !apellido || !numero_documento || !email || !rol || !password) {
        return res.status(400).json({
            success: false,
            message: 'Todos los campos marcados con * son obligatorios'
        });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Formato de email inválido'
        });
    }

    // Validar roles permitidos
    const rolesPermitidos = ['admin', 'guarda'];
    if (!rolesPermitidos.includes(rol)) {
        return res.status(400).json({
            success: false,
            message: 'Rol no válido',
            rolesPermitidos
        });
    }

    try {
        // Verificar si el email ya existe
        Usuario.getByEmail(email, async (err, results) => {
            if (err) {
                console.error('Error verificando email:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Error al verificar disponibilidad del email'
                });
            }

            if (results.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'El email ya está registrado'
                });
            }

            // 🔐 Cifrar la contraseña antes de guardar
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el usuario
            const userData = {
                email,
                password: hashedPassword,
                rol,
                nombre,  
                apellido,  
                numero_documento,
                telefono
            };

            Usuario.create(userData, (createErr, result) => {
                if (createErr) {
                    console.error('Error creando usuario:', createErr);
                    return res.status(500).json({
                        success: false,
                        message: 'Error al crear el usuario'
                    });
                }

                res.status(201).json({
                    success: true,
                    message: 'Usuario registrado exitosamente',
                    userId: result.insertId
                });
            });
        });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};
