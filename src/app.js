require('dotenv').config();
const express = require('express');
const cors = require('cors');

const cultivosRoutes = require('./routes/agente.cultivos.routes');
const mensajesRoutes = require('./routes/agente.mensajes.routes');
const recomendacionesRoutes = require('./routes/agente.recomendaciones.routes');

const cultivosAppRoutes = require('./routes/app.cultivos.routes');
const fertilizantesAppRoutes = require('./routes/app.fertilizantes.routes');
<<<<<<< HEAD
const recomendacionesAppRoutes = require('./routes/app.recomendaciones.routes');
=======
const cultivosFertilizantesAppRoutes = require('./routes/app.cultivosfertilizantes.routes');
const mensajesAppRoutes = require('./routes/app.mensajes.routes');
const tiposFertilizantesAppRoutes = require('./routes/app.tiposfertilizantes.routes');

>>>>>>> 1e497703cd7fe32c29c7fb7d4d7e3849154ebb1f


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cultivos', cultivosRoutes);
app.use('/api/mensajes', mensajesRoutes);
app.use('/api/recomendaciones', recomendacionesRoutes);

app.use('/api/app/cultivos', cultivosAppRoutes);
app.use('/api/app/fertilizantes', fertilizantesAppRoutes);
<<<<<<< HEAD
app.use('/api/app/recomendaciones', recomendacionesAppRoutes);
=======
app.use('/api/app/cultivos-fertilizantes', cultivosFertilizantesAppRoutes);
app.use('/api/app/mensajes', mensajesAppRoutes);
app.use('/api/app/tipos-fertilizantes', tiposFertilizantesAppRoutes);


>>>>>>> 1e497703cd7fe32c29c7fb7d4d7e3849154ebb1f

const PORT = process.env.PORT || 3276;
app.listen(PORT, () => {
  console.log(`AgroAmigo API corriendo en puerto ${PORT}`);
});