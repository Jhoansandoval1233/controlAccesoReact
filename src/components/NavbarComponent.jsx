import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles.css';
import Button from './ui/Button';

const NavbarComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication on component mount
    if (!localStorage.getItem('authenticated')) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear(); // Limpiar localStorage
    navigate('/login', { replace: true }); // Usar replace para evitar volver atrás
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
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
              <Button 
                variant="secondary" 
                onClick={handleLogout} 
                className="logout-btn"
              >
                Cerrar sesión
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;