import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './ui/InputField';
import SelectDropdown from './ui/SelectDropdown';
import AlertComponent from './AlertComponent';
import Button from './ui/Button';
import Card from './ui/Card';
import Modal from './ui/Modal';

const RegistrosFormComponent = () => {
  const [documento, setDocumento] = useState('');
  const [tipoAcceso, setTipoAcceso] = useState('entrada');
  const [incluyeVehiculo, setIncluyeVehiculo] = useState(false);
  const [tipoVehiculo, setTipoVehiculo] = useState('');
  const [placaVehiculo, setPlacaVehiculo] = useState('');
  const [incluyeElemento, setIncluyeElemento] = useState(false);
  const [tipoElemento, setTipoElemento] = useState('');
  const [serial, setSerial] = useState('');
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Agrega función para verificar si la persona existe
  const checkPersonExists = async (documento) => {
    try {
      const response = await fetch(`http://localhost:4000/api/persona/documento/${documento}`);
      const data = await response.json(); // Parse JSON even for 404 response

      // Manejo de error 404 
      if (response.status === 404) {
        console.log('Persona no encontrada, mostrando modal...');
        setShowModal(true);
        return null;
      }

      // Manejo de otros errores
      if (!response.ok) {
        throw new Error(`Error al verificar el documento: ${data.message || response.statusText}`);
      }

      return data.persona;

    } catch (error) {
      console.error('Error en checkPersonExists:', error);
      setAlert({
        show: true,
        type: 'danger',
        message: 'Error al verificar el documento. Por favor, intente nuevamente.'
      });
      return null;
    }
  };

  // Agrega función para manejar la redirección de registro
  const handleRegistrarPersona = () => {
    setShowModal(false); // Cerrar modal antes de navegar
    navigate('/personas', { 
      state: { documento },
      replace: false // Permitir volver atrás
    });
  };

  // Modificar handleSubmit para incluir validación
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ show: false }); // Limpiar cualquier alerta anterior

    try {
      if (!documento) {
        setAlert({
          show: true,
          type: 'danger',
          message: 'El documento es obligatorio.',
        });
        return;
      }

      console.log('Verificando documento:', documento);
      const person = await checkPersonExists(documento);
      
      if (!person) {
        console.log('Persona no encontrada');
        return; // Modal will be shown by checkPersonExists
      }

      // Preparar datos para el registro
      const registroData = {
        persona_id: person.id,
        tipo_movimiento: tipoAcceso,
        fecha_hora: new Date().toISOString()
      };

      // Si incluye vehículo, agregar datos del vehículo
      if (incluyeVehiculo && tipoVehiculo && placaVehiculo) {
        registroData.vehiculo = {
          tipo_vehiculo: tipoVehiculo,
          placa: placaVehiculo
        };
      }

      // Si incluye elemento, agregar datos del elemento
      if (incluyeElemento && tipoElemento && serial) {
        registroData.elemento = {
          tipo_elemento: tipoElemento,
          serial: serial
        };
      }

      // Enviar registro al backend
      const response = await fetch('http://localhost:4000/api/control_acceso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registroData)
      });

      if (!response.ok) {
        throw new Error('Error al guardar el registro');
      }

      const data = await response.json();

      setAlert({
        show: true,
        type: 'success',
        message: `Registro guardado exitosamente para ${person.nombre} ${person.apellido}`,
      });

      // Limpiar formulario
      setDocumento('');
      setTipoAcceso('entrada');
      setIncluyeVehiculo(false);
      setTipoVehiculo('');
      setPlacaVehiculo('');
      setIncluyeElemento(false);
      setTipoElemento('');
      setSerial('');

    } catch (error) {
      console.error('Error en el envío:', error);
      setAlert({
        show: true,
        type: 'danger',
        message: 'Error al procesar la solicitud. Por favor, intente nuevamente.'
      });
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <Card title="Formulario de registros">
        {alert.show && <AlertComponent type={alert.type} message={alert.message} />}

        <form onSubmit={handleSubmit}>
          <InputField
            label="Número de documento"
            type="text"
            placeholder="Ej: 1234567890"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
          />

          <SelectDropdown
            label="Tipo de acceso"
            options={[
              { value: 'entrada', label: 'Entrada' },
              { value: 'salida', label: 'Salida' },
            ]}
            value={tipoAcceso}
            onChange={(e) => setTipoAcceso(e.target.value)}
          />

          {/* Check vehiculo */}
          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="vehiculoCheck"
              checked={incluyeVehiculo}
              onChange={(e) => setIncluyeVehiculo(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="vehiculoCheck">
              Registrar vehículo
            </label>
          </div>

          {incluyeVehiculo && (
            <>
              <SelectDropdown
                label="Tipo de vehículo"
                options={[
                  { value: '', label: 'Seleccione tipo de vehículo' },
                  { value: 'automovil', label: 'Automóvil' },
                  { value: 'motocicleta', label: 'Motocicleta' },
                  { value: 'otro', label: 'Otro' }
                ]}
                value={tipoVehiculo}
                onChange={(e) => setTipoVehiculo(e.target.value)}
              />
              <InputField
                label="Placa del Vehículo"
                type="text"
                placeholder="Ej: ABC123"
                value={placaVehiculo}
                onChange={(e) => setPlacaVehiculo(e.target.value)}
              />
            </>
          )}

          {/* Check elemento */}
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="elementoCheck"
              checked={incluyeElemento}
              onChange={(e) => setIncluyeElemento(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="elementoCheck">
              Registrar elemento
            </label>
          </div>

          {incluyeElemento && (
            <>
              <InputField
                label="Tipo de Elemento"
                type="text"
                placeholder="Ej: Portátil, Herramienta"
                value={tipoElemento}
                onChange={(e) => setTipoElemento(e.target.value)}
              />
              <InputField
                label="Serial"
                type="text"
                placeholder="Ej: ABC123XYZ"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
              />
            </>
          )}

          <Button type="submit" variant="success">
            Guardar Registro
          </Button>
        </form>
      </Card>

      {/* Modal para persona no encontrada */}
      <Modal 
        show={showModal} 
        onClose={() => setShowModal(false)}
        title="Persona no registrada"
        footer={
          <>
            <Button 
              variant="secondary" 
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              onClick={handleRegistrarPersona}
            >
              Registrar Persona
            </Button>
          </>
        }
      >
        <p>La persona con documento <strong>{documento}</strong> no está registrada en el sistema.</p>
        <p>¿Desea registrar esta persona?</p>
      </Modal>
    </div>
  );
};

export default RegistrosFormComponent;