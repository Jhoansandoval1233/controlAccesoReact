import React from 'react';

const AlertComponent = ({ type, message, onClose }) => {
  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {message}
      {/* Botón para cerrar (opcionalmente puedes hacerlo funcional) */}
      <button type="button" className="btn-close"  onClick={onClose}></button>
    </div>
  );
};

export default AlertComponent;