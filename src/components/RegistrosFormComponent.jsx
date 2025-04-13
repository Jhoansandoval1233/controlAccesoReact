import React, { useState } from 'react';
import InputField from './ui/InputField';
import SelectDropdown from './ui/SelectDropdown';
import AlertComponent from './AlertComponent';

const RegistrosFormComponent = () => {
  const [documento, setDocumento] = useState('');
  const [tipoAcceso, setTipoAcceso] = useState('entrada');
  const [incluyeVehiculo, setIncluyeVehiculo] = useState(false);
  const [incluyeElemento, setIncluyeElemento] = useState(false);
  const [placaVehiculo, setPlacaVehiculo] = useState('');
  const [descripcionElemento, setDescripcionElemento] = useState('');
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

    // Simulación de envío de datos
    console.log({
      documento,
      tipoAcceso,
      incluyeVehiculo,
      placaVehiculo,
      incluyeElemento,
      descripcionElemento,
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
    setIncluyeElemento(false);
    setPlacaVehiculo('');
    setDescripcionElemento('');
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h4 className="mb-4 text-center">Formulario de Registros</h4>

      {alert.show && <AlertComponent type={alert.type} message={alert.message} />}

      <form onSubmit={handleSubmit}>
        <InputField
          label="Documento"
          type="text"
          placeholder="Número de documento"
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
            ¿Incluye vehículo?
          </label>
        </div>

        {incluyeVehiculo && (
          <InputField
            label="Placa del Vehículo"
            type="text"
            placeholder="Ej: ABC123"
            value={placaVehiculo}
            onChange={(e) => setPlacaVehiculo(e.target.value)}
          />
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
            ¿Incluye elemento?
          </label>
        </div>

        {incluyeElemento && (
          <InputField
            label="Descripción del Elemento"
            type="text"
            placeholder="Ej: Portátil, caja de herramientas, etc."
            value={descripcionElemento}
            onChange={(e) => setDescripcionElemento(e.target.value)}
          />
        )}

        <button type="submit" className="btn btn-success w-100 mt-4">
          Guardar Registro
        </button>
      </form>
    </div>
  );
};

export default RegistrosFormComponent;