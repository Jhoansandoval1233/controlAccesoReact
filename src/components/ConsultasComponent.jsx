import React, { useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import api from '../api/api';

const ConsultasComponent = () => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [resultados, setResultados] = useState([]);

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Función para realizar la búsqueda
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
  
    try {
      const response = await api.get(`/control-acceso/documento/${searchQuery}`);
      setResultados(response.data.data || []);
    } catch (error) {
      console.error("Error al buscar registro:", error.message);
      setResultados([]); 
    }
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
                 resultados.map((registro, index) => {
                  const [fecha, horaCompleta] = registro.fecha_hora_ingreso
                    ? registro.fecha_hora_ingreso.split(',')
                    : ['-', '-'];
                  const hora = horaCompleta
                    ? horaCompleta.trim().split(':').slice(0, 2).join(':') + ' ' + horaCompleta.trim().slice(-4)
                    : '-';

                  return (
                    <tr key={index} className="table-row">
                     <td>{registro.numero_documento}</td>
                     <td>{fecha}</td>
                     <td>{hora}</td>
                     <td>
                         {registro.fecha_hora_salida && registro.fecha_hora_salida.includes(',')
                          ? registro.fecha_hora_salida.split(',')[1].trim()
                         : 'Pendiente'}
                     </td>
                     <td>{registro.nombre_completo}</td>
                     <td>{registro.tipo_rol}</td>
                     <td>{registro.observaciones || '-'}</td>
                   </tr>
                 );
              })
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