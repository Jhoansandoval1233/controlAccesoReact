import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import InputField from './ui/InputField';
import AlertComponent from './AlertComponent';
import Button from './ui/Button';
import Card from './ui/Card';
import api from '../api/api';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // si ya esta autenticado, redirigir a registros
    if (localStorage.getItem('authenticated')) {
      navigate('/registros');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ show: false });
    setLoading(true);

    try {
      if (!email || !password) {
        setAlert({ 
          show: true, 
          type: 'danger', 
          message: 'Todos los campos son obligatorios.' 
        });
        setLoading(false);
        return;
      }

      const response = await axios.post('http://localhost:4000/api/usuario/login', {
        email,
        password
      });

      if (response.data.success) {
        // Almacenar datos del usuario en localStorage
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));

        // Mostrar mensaje de éxito antes de redirigir
        setAlert({
          show: true,
          type: 'success',
          message: 'Login exitoso. Redirigiendo...'
        });

        // Agregar un pequeño retraso antes de redirigir
        setTimeout(() => {
          navigate('/registros');
        }, 1000);
      }

    } catch (error) {
      console.error('Error de login:', error);
      setAlert({
        show: true,
        type: 'danger',
        message: error.response?.data?.message || 'Error al iniciar sesión'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <Card title="Iniciar sesión">
        {alert.show && (
          <AlertComponent type={alert.type} message={alert.message} />
        )}

        <form onSubmit={handleSubmit}>
          <InputField
            label="Correo electrónico"
            type="email"
            placeholder="correo@sena.edu.co"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <InputField
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <Button 
            type="submit" 
            variant="success"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>

          <div className="d-flex justify-content-between mt-3">
            <Link to="/forgot-password" className="text-decoration-none">
              ¿Olvidó contraseña?
            </Link>
            <Link to="/register" className="text-decoration-none">
              Registrarse
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginComponent;