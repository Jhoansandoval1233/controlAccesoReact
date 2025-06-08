import React from 'react'

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
              <Button 
                variant="primary" 
                onClick={handleRegistrarPersona}
              >
                Registrar Persona
              </Button>
            }
          >
            <p>La persona con documento {documento} no se encuentra registrada en el sistema.</p>
          </Modal>
        )}
      </Card>
    </div>
  )
}
