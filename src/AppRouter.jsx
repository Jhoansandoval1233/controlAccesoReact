import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import LoginComponent from './components/LoginComponent';
import RegistrosFormComponent from './components/RegistrosFormComponent';
import PersonasComponent from './components/PersonasComponent';
import VehiculosComponent from './components/VehiculosComponent';
import ElementosComponent from './components/ElementosComponent';
import ConsultasComponent from './components/ConsultasComponent';
import FooterComponent from './components/FooterComponent';

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('authenticated') === 'true';
      setIsAuthenticated(auth);
    };

    checkAuth(); // Ejecuta al montar

    window.addEventListener('storage', checkAuth); // Escucha evento personalizado

    return () => window.removeEventListener('storage', checkAuth); // Limpieza
  }, []);

  return (
    <Router>
      {isAuthenticated && <NavbarComponent />}

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/registros" /> : <LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/registros" element={isAuthenticated ? <RegistrosFormComponent /> : <Navigate to="/login" />} />
          <Route path="/personas" element={isAuthenticated ? <PersonasComponent /> : <Navigate to="/login" />} />
          <Route path="/vehiculos" element={isAuthenticated ? <VehiculosComponent /> : <Navigate to="/login" />} />
          <Route path="/elementos" element={isAuthenticated ? <ElementosComponent /> : <Navigate to="/login" />} />
          <Route path="/consultas" element={isAuthenticated ? <ConsultasComponent /> : <Navigate to="/login" />} />
        </Routes>
      </div>

      {isAuthenticated && <FooterComponent />}
    </Router>
  );
};

export default AppRouter;