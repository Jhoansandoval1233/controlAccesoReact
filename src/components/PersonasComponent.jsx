import React, { useState } from "react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import AlertComponent from "./AlertComponent";
import api from '../api/api';

const PersonasComponent = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "",
    numeroID: "",
    telefono: "",
    correo: "",
    tipoRol: "",
    registrarElemento: false,
    tipoElemento: "",
    serialElemento: "",
    registrarVehiculo: false,
    tipoVehiculo: "",
    placa: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ show: false });

    try {
      const requiredFields = ['nombre', 'apellido', 'tipoDocumento', 'numeroID', 'tipoRol'];
      const emptyFields = requiredFields.filter(field => !formData[field].trim());

      if (emptyFields.length > 0) {
        setAlert({
          show: true,
          type: 'danger',
          message: `Por favor complete los campos requeridos: ${emptyFields.join(', ')}`
        });
        setLoading(false);
        return;
      }

      const personaData = {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        tipo_documento: formData.tipoDocumento,
        numero_documento: formData.numeroID.trim(),
        telefono: formData.telefono.trim() || null,
        correo: formData.correo.trim() || null,
        tipo_rol: formData.tipoRol
      };

      console.log("Enviando persona:", personaData);
      console.log('Datos a enviar:', personaData);
      const response = await api.post('/persona', personaData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = response.data;
      const personaId = data.id;

      if (formData.registrarVehiculo && formData.tipoVehiculo && formData.placa) {
        await api.post('/vehiculo', {
          persona_id: personaId,
          tipo_vehiculo: formData.tipoVehiculo,
          placa: formData.placa.trim()
        });
      }

      if (formData.registrarElemento && formData.tipoElemento && formData.serialElemento) {
        await api.post('/elemento', {
          persona_id: personaId,
          tipo_elemento: formData.tipoElemento.trim(),
          serial: formData.serialElemento.trim()
        });
      }

      setAlert({
        show: true,
        type: 'success',
        message: 'Registro completado exitosamente'
      });

      setFormData({
        nombre: "",
        apellido: "",
        tipoDocumento: "",
        numeroID: "",
        telefono: "",
        correo: "",
        tipoRol: "",
        registrarElemento: false,
        tipoElemento: "",
        serialElemento: "",
        registrarVehiculo: false,
        tipoVehiculo: "",
        placa: "",
      });

    } catch (error) {
      console.error('Error completo:', error);
      setAlert({
        show: true,
        type: 'danger',
        message: error.response?.data?.message || error.response?.data?.error || 'Error al procesar el registro'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <Card title="Ingresar persona">
        {alert.show && (
          <AlertComponent 
            type={alert.type} 
            message={alert.message}
            onClose={() => setAlert({ show: false })} 
          />
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombres"
                className="form-control"
              />
            </div>
            <div className="col-12">
              <input
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder="Apellidos"
                className="form-control"
              />
            </div>
            <div className="col-12">
              <select 
                name="tipoDocumento" 
                value={formData.tipoDocumento} 
                onChange={handleChange} 
                className="form-select"
              >
                <option value="">Tipo de documento</option>
                <option value="CC">Cédula de ciudadanía</option>
                <option value="TI">Tarjeta de identidad</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>
            <div className="col-12">
              <input
                name="numeroID"
                value={formData.numeroID}
                onChange={handleChange}
                placeholder="Número de documento"
                className="form-control"
              />
            </div>
            <div className="col-12">
              <input
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className="form-control"
              />
            </div>
            <div className="col-12">
              <input
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder="Correo electrónico"
                className="form-control"
              />
            </div>
            <div className="col-12">
              <select 
                name="tipoRol" 
                value={formData.tipoRol} 
                onChange={handleChange} 
                className="form-select"
              >
                <option value="">Tipo de visitante</option>
                <option value="Visitante">Visitante</option>
                <option value="Empleado">Empleado</option>
                <option value="Proveedor">Proveedor</option>
                <option value="Aprendiz">Aprendiz</option>
              </select>
            </div>

            <div className="col-12 form-check mt-3">
              <input
                type="checkbox"
                name="registrarVehiculo"
                checked={formData.registrarVehiculo}
                onChange={handleChange}
                className="form-check-input"
                id="checkVehiculo"
              />
              <label htmlFor="checkVehiculo" className="form-check-label">
                Registrar vehículo
              </label>
            </div>

            {formData.registrarVehiculo && (
              <>
                <div className="col-12">
                  <select
                    name="tipoVehiculo"
                    value={formData.tipoVehiculo}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Seleccione tipo de vehículo</option>
                    <option value="automovil">Automóvil</option>
                    <option value="motocicleta">Motocicleta</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="col-12">
                  <input
                    name="placa"
                    value={formData.placa}
                    onChange={handleChange}
                    placeholder="Placa"
                    className="form-control"
                  />
                </div>
              </>
            )}

            <div className="col-12 form-check mt-3">
              <input
                type="checkbox"
                name="registrarElemento"
                checked={formData.registrarElemento}
                onChange={handleChange}
                className="form-check-input"
                id="checkElemento"
              />
              <label htmlFor="checkElemento" className="form-check-label">
                Registrar elemento
              </label>
            </div>

            {formData.registrarElemento && (
              <>
                <div className="col-12">
                  <input
                    name="tipoElemento"
                    value={formData.tipoElemento}
                    onChange={handleChange}
                    placeholder="Tipo de elemento"
                    className="form-control"
                  />
                </div>
                <div className="col-12">
                  <input
                    name="serialElemento"
                    value={formData.serialElemento}
                    onChange={handleChange}
                    placeholder="Serial"
                    className="form-control"
                  />
                </div>
              </>
            )}
          </div>

          <div className="text-center mt-4">
            <Button 
              type="submit" 
              variant="success"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrar datos'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PersonasComponent;
