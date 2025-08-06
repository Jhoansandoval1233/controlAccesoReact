import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from './ui/Card';
import InputField from './ui/InputField';
import Button from './ui/Button';
import AlertComponent from './AlertComponent';
import api from '../api/api';

export default function RestablecerContrasena() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const [form, setForm] = useState({
    numero_documento: '',
    nombre_completo: '',
    nueva_contrasena: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setAlert({ show: false });

  try {
    // Definir formData con los campos correctos
    const formData = {
      documento: form.numero_documento,
      nombre: form.nombre_completo,
      nuevaContrasena: form.nueva_contrasena
       
    };

    // Log de la petición
    console.log('Intentando restablecer contraseña:', {
      url: '/usuario/restablecer-contrasena',
      data: formData

   
    });

    const response = await api.post('/usuario/restablecer-contrasena', formData);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al restablecer contraseña');
    }

    setAlert({
      show: true,
      type: 'success',
      message: response.data.message || 'Contraseña actualizada exitosamente'
    });

    setTimeout(() => navigate('/login'), 2000);

  } catch (err) {
    console.error('Error en restablecimiento:', {
      status: err.response?.status,
      statusText: err.response?.statusText,
      data: err.response?.data,
      message: err.message
    });

    setAlert({
      show: true,
      type: 'danger',
      message: err.response?.data?.message || 
               'Error al conectar con el servidor. Por favor, intente más tarde.'
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <Card title="Restablecer contraseña">
        {alert.show && (
          <AlertComponent type={alert.type} message={alert.message} />
        )}

        <form onSubmit={handleSubmit}>
          <InputField
            label="Número de documento"
            name="numero_documento"
            type="text"
            value={form.numero_documento}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              handleChange({
                ...e,
                target: {
                  ...e.target,
                  value,
                  name: e.target.name
                }
              });
            }}
            required
            disabled={loading}
            pattern="[0-9]*"
            maxLength="20"
          />

          <InputField
            label="Nombre completo"
            name="nombre_completo"
            type="text"
            value={form.nombre_completo}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <InputField
            label="Nueva contraseña"
            name="nueva_contrasena"
            type="password"
            value={form.nueva_contrasena}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <Button type="submit" variant="success" disabled={loading}>
            {loading ? 'Procesando...' : 'Restablecer Contraseña'}
          </Button>

          <div className="text-center mt-3">
            <Link to="/" className="text-decoration-none">
              Volver al login
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
