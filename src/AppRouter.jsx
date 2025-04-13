import React from 'react';
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
  const isAuthenticated = localStorage.getItem('authenticated') === 'true'; 

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