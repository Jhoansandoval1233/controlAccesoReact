import React, { useState } from 'react';
import Modal from './ui/Modal';
import Button from './ui/Button';
import Card from './ui/Card';
import AlertComponent from './AlertComponent';

export default function ModalComponent() {
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [showModal, setShowModal] = useState(false);
  const [documento, setDocumento] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    numero_documento: '',
    telefono: '',
    email: '',
    rol: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación de búsqueda de persona
    const personaRegistrada = false; // Cambia esto según lógica real

    if (!personaRegistrada) {
      setDocumento(formData.numero_documento);
      setShowModal(true);
    } else {
      setAlert({
        show: true,
        type: 'success',
        message: 'Persona ya registrada'
      });
    }
  };

  const handleRegistrarPersona = () => {
    // Lógica de registrar persona
    console.log('Registrando persona con documento:', documento);
    setShowModal(false);
    setAlert({
      show: true,
      type: 'success',
      message: 'Persona registrada exitosamente'
    });
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <Card title="Formulario de registros">
        {alert.show && <AlertComponent type={alert.type} message={alert.message} />}

        <form onSubmit={handleSubmit}>
          {/* Aquí irían los campos reales del formulario */}
          <input
            type="text"
            name="numero_documento"
            placeholder="Número de documento"
            value={formData.numero_documento}
            onChange={(e) =>
              setFormData({ ...formData, numero_documento: e.target.value })
            }
            className="form-control mb-3"
          />

          <Button type="submit" variant="success">
            Buscar
          </Button>
        </form>

        {showModal && (
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            title="Persona no registrada"
            footer={
              <>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </Button>
                <Button variant="success" onClick={handleRegistrarPersona}>
                  Registrar Persona
                </Button>
              </>
            }
          >
            <div className="modal-body">
              <p>
                La persona con documento <strong>{documento}</strong> no está
                registrada en el sistema.
              </p>
              <p>¿Desea registrar esta persona?</p>
            </div>
          </Modal>
        )}
      </Card>
    </div>
  );
}
