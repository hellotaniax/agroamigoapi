require('dotenv').config();
const express = require('express');
const cors = require('cors');

const cultivosRoutes = require('./routes/agente.cultivos.routes');
const mensajesRoutes = require('./routes/agente.mensajes.routes');
const recomendacionesRoutes = require('./routes/agente.recomendaciones.routes');



const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cultivos', cultivosRoutes);
app.use('/api/mensajes', mensajesRoutes);
app.use('/api/recomendaciones', recomendacionesRoutes);

const PORT = process.env.PORT || 3276;
app.listen(PORT, () => {
  console.log(`AgroAmigo API corriendo en puerto ${PORT}`);
});