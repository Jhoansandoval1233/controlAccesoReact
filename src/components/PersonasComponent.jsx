import React, { useState } from "react";

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
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Ingresar Persona</h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombres"
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <input
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Apellidos"
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange} className="form-select">
                  <option value="">Tipo de documento</option>
                  <option value="CC">Cédula de ciudadanía</option>
                  <option value="TI">Tarjeta de identidad</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
              </div>

              <div className="col-md-6">
                <input
                  name="numeroID"
                  value={formData.numeroID}
                  onChange={handleChange}
                  placeholder="Número ID"
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <input
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Teléfono"
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <input
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="Correo electrónico"
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <select name="tipoRol" value={formData.tipoRol} onChange={handleChange} className="form-select">
                  <option value="">Tipo de visitante</option>
                  <option value="Visitante">Visitante</option>
                  <option value="Empleado">Empleado</option>
                  <option value="Proveedor">Proveedor</option>
                  <option value="Aprendiz">Aprendiz</option>
                </select>
              </div>

              <div className="col-12 form-check mt-2">
                <input
                  type="checkbox"
                  name="registrarElemento"
                  checked={formData.registrarElemento}
                  onChange={handleChange}
                  className="form-check-input"
                  id="checkElemento"
                />
                <label htmlFor="checkElemento" className="form-check-label">Registrar elemento</label>
              </div>

              {formData.registrarElemento && (
                <>
                  <div className="col-md-6">
                    <input
                      name="tipoElemento"
                      value={formData.tipoElemento}
                      onChange={handleChange}
                      placeholder="Tipo de elemento"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
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

              <div className="col-12 form-check mt-2">
                <input
                  type="checkbox"
                  name="registrarVehiculo"
                  checked={formData.registrarVehiculo}
                  onChange={handleChange}
                  className="form-check-input"
                  id="checkVehiculo"
                />
                <label htmlFor="checkVehiculo" className="form-check-label">Registrar vehículo</label>
              </div>

              {formData.registrarVehiculo && (
                <>
                  <div className="col-md-6">
                    <input
                      name="tipoVehiculo"
                      value={formData.tipoVehiculo}
                      onChange={handleChange}
                      placeholder="Tipo de vehículo"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
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
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-success px-4">
                Registrar datos
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonasComponent;