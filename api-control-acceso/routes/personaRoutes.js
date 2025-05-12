const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');

router.get('/', personaController.getAll);
router.get('/:id', personaController.getById);
router.post('/', personaController.create);
router.put('/:id', personaController.update);
router.delete('/:id', personaController.delete);

router.get('/test', (req, res) => {
    console.log('Solicitud recibida en /api/persona/test');
    res.send('Ruta de prueba funcionando');
  });

module.exports = router;