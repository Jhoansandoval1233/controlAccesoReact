import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
import InputField from './ui/InputField';
import AlertComponent from './AlertComponent';
import Button from './ui/Button';
import Card from './ui/Card';
import api from '../api/api';

const UsuariosRegistro = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [formData, setFormData] = useState({
    nombre: '',           
    apellido: '',        
    numero_documento: '',
    telefono: '',
    email: '',           
    rol: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ show: false });

    try {
      // Validar campos requeridos
      const requiredFields = ['nombre', 'apellido', 'numero_documento', 'email', 'rol', 'password'];
      const emptyFields = requiredFields.filter(field => !formData[field]);

      if (emptyFields.length > 0) {
        setAlert({
          show: true,
          type: 'danger',
          message: 'Por favor complete todos los campos requeridos'
        });
        return;
      }

      const response = await api.post('http://localhost:4000/api/usuario/registro', formData);

      if (response.data.success) {
        setAlert({
          show: true,
          type: 'success',
          message: 'Usuario registrado exitosamente. Redirigiendo al login...'
        });

        setTimeout(() => {
          navigate('/');
        }, 2000);
      }

    } catch (error) {
      console.error('Error de registro:', error);
      setAlert({
        show: true,
        type: 'danger',
        message: error.response?.data?.message || 'Error al registrar usuario'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <Card title="Registro de usuario">
        {alert.show && (
          <AlertComponent type={alert.type} message={alert.message}
          onClose={() => setAlert({ show: false })}  />
        )}

        <form onSubmit={handleSubmit}>
          <InputField
            label="Nombres *"
            type="text"
            name="nombre"           
            value={formData.nombre}           
            onChange={handleChange}
            disabled={loading}
            required
          />

          <InputField
            label="Apellidos *"
            type="text"
            name="apellido"        
            value={formData.apellido}        
            onChange={handleChange}
            disabled={loading}
            required
          />

          <InputField
            label="Número de documento *"
            type="text"
            name="numero_documento"
            value={formData.numero_documento}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <InputField
            label="Teléfono"
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            disabled={loading}
          />

          <InputField
            label="Correo electrónico *"
            type="email"
            name="email"           
            value={formData.email}           
            onChange={handleChange}
            disabled={loading}
            required
          />

          <div className="mb-3">
            <label className="form-label">Rol *</label>
            <select
              className="form-select"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              disabled={loading}
              required
            >
              <option value="">Seleccione un rol</option>
              <option value="admin">Admin</option>
              <option value="guarda">Guarda</option>
            </select>
          </div>

          <InputField
            label="Contraseña *"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <Button
            type="submit"
            variant="success"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </Button>

          <div className="text-center mt-3">
            <a href="/" className="text-decoration-none">
              ¿Ya tienes cuenta? Inicia sesión
            </a>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UsuariosRegistro;