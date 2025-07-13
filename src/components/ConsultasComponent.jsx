import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Card from "./ui/Card";
import Button from "./ui/Button";
import api from '../api/api';

const ConsultasComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const { data } = await api.get(`/control-acceso/documento/${searchQuery}`);
      setResultados(data.data || []);
    } catch (err) {
      console.error("Error al buscar registro:", err);
      setResultados([]);
    }
  };

  const handleExport = () => {
    if (!resultados.length) return alert("No hay datos para exportar.");

    const doc = new jsPDF();
    doc.text("Registros de Acceso", 14, 15);

    const headers = [
      "Documento",
      "Fecha",
      "Entrada",
      "Salida",
      "Persona",
      "Cargo",
      "Tipo vehículo",
      "Placa",
      "Tipo elemento",
      "Serial"
    ];

    const rows = resultados.map(r => {
      const [fecha, horaIngreso] = r.fecha_hora_ingreso?.split(',') || ['-', '-'];
      const horaSalida = r.fecha_hora_salida?.split(',')[1]?.trim() || 'Pendiente';
      return [
        r.numero_documento,
        fecha,
        horaIngreso,
        horaSalida,
        r.nombre_completo,
        r.tipo_rol,
        r.tipo_vehiculo || '-',
        r.placa || '-',
        r.tipo_elemento || '-',
        r.serial || '-'
      ];
    });

    autoTable(doc, {
      startY: 20,
      head: [headers],
      body: rows,
      styles: { fontSize: 8 }
    });

    doc.save("registros_acceso.pdf");
  };

  return (
    <div className="container mt-5">
      <Card title="Consultar registros">
        <div className="row mb-3">
          <div className="col-8">
            <input
              className="form-control"
              placeholder="Buscar por documento..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-4 d-flex gap-2">
            <Button variant="primary" onClick={handleSearch}>Buscar</Button>
            <Button variant="secondary" onClick={handleExport}>Exportar</Button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>Documento</th>
                <th>Fecha</th>
                <th>Entrada</th>
                <th>Salida</th>
                <th>Persona</th>
                <th>Cargo</th>
                <th>Tipo vehículo</th>
                <th>Placa</th>
                <th>Tipo elemento</th>
                <th>Serial</th>
              </tr>
            </thead>
            <tbody>
              {resultados.length ? resultados.map((r, i) => {
                const [fecha, horaIngreso] = r.fecha_hora_ingreso?.split(',') || ['-', '-'];
                const horaSalida = r.fecha_hora_salida?.split(',')[1]?.trim() || 'Pendiente';
                return (
                  <tr key={i}>
                    <td>{r.numero_documento}</td>
                    <td>{fecha}</td>
                    <td>{horaIngreso}</td>
                    <td>{horaSalida}</td>
                    <td>{r.nombre_completo}</td>
                    <td>{r.tipo_rol}</td>
                    <td>{r.tipo_vehiculo || '-'}</td>
                    <td>{r.placa || '-'}</td>
                    <td>{r.tipo_elemento || '-'}</td>
                    <td>{r.serial || '-'}</td>
                  </tr>
                );
              }) : (
                <tr><td colSpan="10" className="py-4 text-muted">No se encontraron registros</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ConsultasComponent;
