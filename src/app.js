require('dotenv').config();
const express = require('express');
const cors = require('cors');

const cultivosRoutes = require('./routes/agente.cultivos.routes');
const mensajesRoutes = require('./routes/agente.mensajes.routes');
const recomendacionesRoutes = require('./routes/agente.recomendaciones.routes');

const cultivosAppRoutes = require('./routes/app.cultivos.routes');
const fertilizantesAppRoutes = require('./routes/app.fertilizantes.routes');
const recomendacionesAppRoutes = require('./routes/app.recomendaciones.routes');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cultivos', cultivosRoutes);
app.use('/api/mensajes', mensajesRoutes);
app.use('/api/recomendaciones', recomendacionesRoutes);

app.use('/api/app/cultivos', cultivosAppRoutes);
app.use('/api/app/fertilizantes', fertilizantesAppRoutes);
app.use('/api/app/recomendaciones', recomendacionesAppRoutes);

const PORT = process.env.PORT || 3276;
app.listen(PORT, () => {
  console.log(`AgroAmigo API corriendo en puerto ${PORT}`);
});