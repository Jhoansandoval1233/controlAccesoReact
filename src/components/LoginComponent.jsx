import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './ui/InputField';
import AlertComponent from './AlertComponent';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const navigate = useNavigate(); // 👉 Para redirigir

  useEffect(() => {
    // Si ya está autenticado, redirige automáticamente
    if (localStorage.getItem('authenticated')) {
      navigate('/registros');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setAlert({ show: true, type: 'danger', message: 'Todos los campos son obligatorios.' });
      return;
    }

    // Simulación de autenticación
    if (email === 'admin@sena.edu.co' && password === '1234') {
      // Guardamos la autenticación en localStorage
      localStorage.setItem('authenticated', 'true');
      navigate('/registros'); // 👈 Redirigir al menú principal
    } else {
      setAlert({ show: true, type: 'danger', message: 'Credenciales incorrectas.' });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="text-center mb-4">Iniciar Sesión</h3>

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
        />

        <InputField
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;