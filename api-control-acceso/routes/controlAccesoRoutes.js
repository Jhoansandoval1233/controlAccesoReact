const express = require('express');
const router = express.Router();
const controlAccesoController = require('../controllers/controlAccesoController');

router.get('/', controlAccesoController.getAll);

router.get('/:id', controlAccesoController.getById);

router.post('/', controlAccesoController.create);

router.put('/:id', controlAccesoController.update);

router.delete('/:id', controlAccesoController.delete);

module.exports = router;