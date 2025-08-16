import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './ui/InputField';
import SelectDropdown from './ui/SelectDropdown';
import AlertComponent from './AlertComponent';
import Button from './ui/Button';
import Card from './ui/Card';
import Modal from './ui/Modal';
import api from '../api/api';

const RegistrosFormComponent = () => {
  const [documento, setDocumento] = useState('');
  const [tipoAcceso, setTipoAcceso] = useState('entrada');
  const [incluyeVehiculo, setIncluyeVehiculo] = useState(false);
  const [tipoVehiculo, setTipoVehiculo] = useState('');
  const [placaVehiculo, setPlacaVehiculo] = useState('');
  const [incluyeElemento, setIncluyeElemento] = useState(false);
  const [tipoElemento, setTipoElemento] = useState('');
  const [serial, setSerial] = useState('');
  const [observaciones, setObservaciones] = useState(''); // NUEVO estado para observaciones
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const checkPersonExists = async (documento) => {
    try {
      const response = await api.get(`/persona/documento/${documento}`);
      return response.data.persona;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('Persona no encontrada, mostrando modal...');
        setShowModal(true);
      } else {
        console.error('Error en checkPersonExists:', error);
        setAlert({
          show: true,
          type: 'danger',
          message: 'Error al verificar el documento. Por favor, intente nuevamente.'
        });
      }
      return null;
    }
  };

  const handleRegistrarPersona = () => {
    setShowModal(false);
    navigate('/personas', {
      state: { documento },
      replace: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ show: false });

    try {
      if (!documento) {
        setAlert({
          show: true,
          type: 'danger',
          message: 'El documento es obligatorio.',
        });
        return;
      }

      const person = await checkPersonExists(documento);
      if (!person) return;

      const registroData = {
        persona_id: person.id,
        tipo_movimiento: tipoAcceso,
        fecha_hora: new Date().toISOString(),
        observaciones: observaciones.trim(), // INCLUIMOS observaciones aquí
      };

      if (incluyeVehiculo && tipoVehiculo && placaVehiculo) {
        registroData.vehiculo = {
          tipo_vehiculo: tipoVehiculo,
          placa: placaVehiculo,
          persona_id: person.id 
        };
      }

      if (incluyeElemento && tipoElemento && serial) {
        registroData.elemento = {
          tipo_elemento: tipoElemento,
          serial: serial
        };
      }

      await api.post('/control-acceso', registroData);

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
      setObservaciones(''); // LIMPIAR campo observaciones

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
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setDocumento(value);
              }
            }}    
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
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  if (/^[A-Z]{0,3}[0-9]{0,3}[A-Z]{0,1}$/.test(value) && value.length <= 6) {
                    setPlacaVehiculo(value);
                  }
                }}
              />
            </>
          )}

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

          {/* NUEVO CAMPO OBSERVACIONES */}
          <InputField
            label="Observaciones"
            type="text"
            placeholder="Escribe alguna observación..."
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />

          <Button type="submit" variant="success" className="mt-3">
            Guardar Registro
          </Button>
        </form>
      </Card>

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
