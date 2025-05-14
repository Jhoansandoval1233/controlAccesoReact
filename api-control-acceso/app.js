const express = require('express');
const app = express();
const cors = require('cors');
const controlAccesoRoutes = require('./routes/controlAccesoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const personaRoutes = require('./routes/personaRoutes');
const vehiculoRoutes = require('./routes/vehiculoRoutes');
const elementoRoutes = require('./routes/elementoRoutes');


app.use(cors());
app.use(express.json());

app.use('/api/control_acceso', controlAccesoRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/persona', personaRoutes);
app.use('/api/vehiculo', vehiculoRoutes);
app.use('/api/elemento', elementoRoutes);


app.use((req, res) => {
    res.status(404).send('Página no encontrada');
  });
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);

  app.get('/test', (req, res) => {
    console.log('Solicitud recibida en /test');
    res.send('Ruta de prueba directa funcionando');
});

});
module.exports = app; 