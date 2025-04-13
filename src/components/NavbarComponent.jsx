import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar el estado de autenticación
    localStorage.removeItem('authenticated');
    navigate('/login'); // Redirigir al login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Control Acceso</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/registros">Registros</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/personas">Personas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/consultas">Consultas</NavLink>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-danger">Cerrar sesión</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;