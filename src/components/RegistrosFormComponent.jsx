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

  // Add function to check if person exists
  const checkPersonExists = async (documento) => {
    try {
      const response = await fetch(`http://localhost:4000/api/persona/documento/${documento}`);
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Error al verificar el documento');
      }
      
      return data.persona;
    } catch (error) {
      console.error('Error:', error);
      setAlert({
        show: true,
        type: 'danger',
        message: 'Error al verificar el documento. Por favor, intente nuevamente.'
      });
      return null;
    }
  };

  // Add function to handle registration redirect
  const handleRegistrarPersona = () => {
    navigate('/personas', { state: { documento } });
  };

  // Modify handleSubmit to include validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!documento) {
      setAlert({
        show: true,
        type: 'danger',
        message: 'El documento es obligatorio.',
      });
      return;
    }

    // Check if person exists
    const person = await checkPersonExists(documento);
    if (!person) {
      setShowModal(true);
      return;
    }

    console.log({
      documento,
      tipoAcceso,
      incluyeVehiculo,
      tipoVehiculo,
      placaVehiculo,
      incluyeElemento,
      tipoElemento,
      serial,
    });

    setAlert({
      show: true,
      type: 'success',
      message: 'Registro guardado exitosamente.',
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

    // Navigate to another page or show modal
    // navigate('/another-page');
    // or
    // showModal();
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

      {/* Modal for person not found */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Persona no encontrada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>No se encontró ninguna persona con el documento ingresado.</p>
          <p>¿Desea registrar una nueva persona?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleRegistrarPersona}>
            Registrar Persona
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegistrosFormComponent;