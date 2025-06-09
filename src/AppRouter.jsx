import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import NavbarComponent from './components/NavbarComponent';
import RegistrosFormComponent from './components/RegistrosFormComponent';
import PersonasComponent from './components/PersonasComponent';
import ConsultasComponent from './components/ConsultasComponent';
import FooterComponent from './components/FooterComponent';
import UsuariosRegistro from './components/UsuariosRegistroComponent';
import RestablecerContraseña from './components/RestablecerContraseñaComponent';


// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

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
      {/* NavBar solo aparece una vez autenticado */}
      {isAuthenticated && <NavbarComponent />}

      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/" element={
            isAuthenticated ? 
            <Navigate to="/registros" /> : 
            <Navigate to="/login" />
          } />
          
          {/* Protected Routes */}
          <Route path="/registros" element={
            <ProtectedRoute>
              <RegistrosFormComponent />
            </ProtectedRoute>
          } />
          <Route path="/personas" element={
            <ProtectedRoute>
              <PersonasComponent />
            </ProtectedRoute>
          } />
          <Route path="/consultas" element={
            <ProtectedRoute>
              <ConsultasComponent />
            </ProtectedRoute>
          } />
          <Route path="/register" element={<UsuariosRegistro />} />
          <Route path="/forgot-password" element={<RestablecerContraseña />} />
        </Routes>
      </div>

      {isAuthenticated && <FooterComponent />}
    </Router>
  );
};

export default AppRouter;