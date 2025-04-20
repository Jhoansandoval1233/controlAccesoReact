import React from 'react'
import '../styles.css'

export default function FooterComponent() {
  return (
    <footer className="footer bg-secondary text-white py-4">
      <div className="container text-center text-md-start">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>Control de Acceso</h5>
            <p>SENA - Taladro</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6>Desarrollado por</h6>
            <p><strong>Development Systems</strong></p>
            <p>© 2025. Todos los derechos reservados.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6>Legal</h6>
            <a href="#" className="text-light text-decoration-none d-block">Política de privacidad</a>
            <a href="#" className="text-light text-decoration-none d-block">Términos de uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
