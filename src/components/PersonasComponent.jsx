import React, { useState } from "react";
import Button from "./ui/Button";
import Card from "./ui/Card";

const PersonasComponent = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos registrados:", formData);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <Card title="Ingresar persona">
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
            <Button type="submit" variant="success">
              Registrar datos
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PersonasComponent;