import React, { useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";

const ConsultasComponent = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para el campo de búsqueda
  const [resultados, setResultados] = useState([]); // Estado para los resultados de la búsqueda

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
      <Card title="Consultar registros">
        {/* Barra de búsqueda y botones */}
        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <div className="search-wrapper">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Buscar por ID..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="d-flex gap-2">
              <Button variant="primary" onClick={handleSearch} className="flex-grow-1">
                Buscar
              </Button>
              <Button variant="secondary" onClick={handleExport} className="flex-grow-1">
                Exportar
              </Button>
            </div>
          </div>
        </div>

        {/* Tabla de resultados */}
        <div className="table-responsive custom-table">
          <table className="table table-hover">
            <thead className="table-header">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Fecha</th>
                <th scope="col">Entrada</th>
                <th scope="col">Salida</th>
                <th scope="col">Persona</th>
                <th scope="col">Cargo</th>
                <th scope="col">Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {resultados.length > 0 ? (
                resultados.map((registro) => (
                  <tr key={registro.id} className="table-row">
                    <td>{registro.id}</td>
                    <td>{registro.fecha}</td>
                    <td>{registro.entrada}</td>
                    <td>{registro.salida}</td>
                    <td>{registro.persona}</td>
                    <td>{registro.cargo}</td>
                    <td>{registro.observaciones || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    No se encontraron registros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ConsultasComponent;