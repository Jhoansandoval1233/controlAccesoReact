import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './ui/Card';
import InputField from './ui/InputField';
import Button from './ui/Button';
import AlertComponent from './AlertComponent';
import api from '../api/api';

export default function RestablecerContrasena() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // 💡 Cambiar nombres para coincidir con backend
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
      const response = await api.put('/usuario/restablecer', form);
      console.log(response.data);
      setAlert({
        show: true,
        type: 'success',
        message: 'Contraseña actualizada exitosamente',
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Error al restablecer contraseña:', err);
      const message =
        err.response?.data?.message || 'Error al conectar con el servidor';
      setAlert({
        show: true,
        type: 'danger',
        message,
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
            onChange={handleChange}
            required
            disabled={loading}
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
            <a href="/" className="text-decoration-none">
              Volver al login
            </a>
          </div>
        </form>
      </Card>
    </div>
  );
}
