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
  const [form, setForm] = useState({
    documento: '',
    nombre: '',
    nuevaContrasena: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setAlert({ show: false });

    try {
      const res = await fetch('http://localhost:4000/api/usuario/restablecer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      
      if (res.ok) {
        setAlert({
          show: true,
          type: 'success',
          message: 'Contraseña actualizada exitosamente'
        });
        
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setAlert({
          show: true,
          type: 'danger',
          message: data.message
        });
      }
    } catch (err) {
      setAlert({
        show: true,
        type: 'danger',
        message: 'Error al conectar con el servidor'
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
            name="documento"
            type="text"
            value={form.documento}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <InputField
            label="Nombre completo"
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <InputField
            label="Nueva contraseña"
            name="nuevaContrasena"
            type="password"
            value={form.nuevaContrasena}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <Button
            type="submit"
            variant="success"
            disabled={loading}
          >
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
