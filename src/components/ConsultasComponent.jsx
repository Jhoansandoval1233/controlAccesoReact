import React, { useState } from "react";

const ConsultasComponent = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para el campo de búsqueda
  const [resultados, setResultados] = useState([]); // Estado para los resultados de la búsqueda

  // Datos de ejemplo para mostrar en la tabla
  const registrosDeEjemplo = [
    { id: 1, fecha: "28/03/2025", entrada: "06:00", salida: "14:00", persona: "Pedro Perez", cargo: "Aprendiz", observaciones: "" },
    { id: 2, fecha: "28/03/2025", entrada: "06:00", salida: "14:00", persona: "Pablo Rodriguez", cargo: "Visitante", observaciones: "S/N" },
    { id: 3, fecha: "28/03/2025", entrada: "06:00", salida: "14:00", persona: "Juan Perez", cargo: "Funcionario", observaciones: "S/N" },
    // Puedes agregar más registros aquí
  ];

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Función para realizar la búsqueda
  const handleSearch = () => {
    // Filtra los registros por ID si coincide con el texto de búsqueda
    const filteredResults = registrosDeEjemplo.filter((registro) =>
      registro.id.toString().includes(searchQuery)
    );
    setResultados(filteredResults);
  };

  // Función para exportar los registros (esto es solo un ejemplo)
  const handleExport = () => {
    alert("Funcionalidad de exportar aún no implementada.");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Consultar Registros</h2>
      
      {/* Fila de búsqueda */}
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por ID..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-6 d-flex justify-content-between">
          <button className="btn btn-success" onClick={handleSearch}>
            Buscar
          </button>
          <button className="btn btn-primary" onClick={handleExport}>
            Exportar
          </button>
        </div>
      </div>

      {/* Tabla de resultados */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Entrada</th>
              <th>Salida</th>
              <th>Persona</th>
              <th>Cargo</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {resultados.length > 0 ? (
              resultados.map((registro) => (
                <tr key={registro.id}>
                  <td>{registro.id}</td>
                  <td>{registro.fecha}</td>
                  <td>{registro.entrada}</td>
                  <td>{registro.salida}</td>
                  <td>{registro.persona}</td>
                  <td>{registro.cargo}</td>
                  <td>{registro.observaciones}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No se encontraron registros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultasComponent;