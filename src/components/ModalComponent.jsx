import React from 'react'
import Modal from './ui/Modal';

export default function ModalComponent() {
  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <Card title="Formulario de registros">
        {alert.show && <AlertComponent type={alert.type} message={alert.message} />}
        
        <form onSubmit={handleSubmit}>
          {/* ...existing form fields... */}
        </form>

        {showModal && (
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            title="Persona no registrada"
            footer={
              <>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  variant="success" 
                  onClick={handleRegistrarPersona}
                >
                  Registrar Persona
                </Button>
              </>
            }
          >
            <div className="modal-body">
              <p>La persona con documento <strong>{documento}</strong> no está registrada en el sistema.</p>
              <p>¿Desea registrar esta persona?</p>
            </div>
          </Modal>
        )}
      </Card>
    </div>
  )
}
