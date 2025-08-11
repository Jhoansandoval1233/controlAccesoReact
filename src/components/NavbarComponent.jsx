import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles.css';
import Button from './ui/Button';
import logo from './assets/logo2.png';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src={logo} 
            alt="Logo" 
            height="40" 
            className="me-2" 
          />
          Control Acceso
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              // Menú para usuarios autenticados
              <>
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
              </>
            ) : (
              // Menú para usuarios no autenticados
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Iniciar sesión</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Registrarse</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;