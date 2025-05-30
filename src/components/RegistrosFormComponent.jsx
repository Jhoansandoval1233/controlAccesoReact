import React, { useState } from 'react';
import InputField from './ui/InputField';
import SelectDropdown from './ui/SelectDropdown';
import AlertComponent from './AlertComponent';
import Button from './ui/Button';
import Card from './ui/Card';

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!documento) {
      setAlert({
        show: true,
        type: 'danger',
        message: 'El documento es obligatorio.',
      });
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
    </div>
  );
};

export default RegistrosFormComponent;