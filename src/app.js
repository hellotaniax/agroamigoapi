require('dotenv').config();
const express = require('express');
const cors = require('cors');

const cultivosRoutes = require('./routes/agente.cultivos.routes');
const mensajesRoutes = require('./routes/agente.mensajes.routes');
const recomendacionesRoutes = require('./routes/agente.recomendaciones.routes');

const cultivosAppRoutes = require('./routes/app.cultivos.routes');
const fertilizantesAppRoutes = require('./routes/app.fertilizantes.routes');
const cultivosFertilizantesAppRoutes = require('./routes/app.cultivosfertilizantes.routes');
const mensajesAppRoutes = require('./routes/app.mensajes.routes');
const tiposFertilizantesAppRoutes = require('./routes/app.tiposfertilizantes.routes');
const recomendacionesAppRoutes = require('./routes/app.recomendaciones.routes');
const recomendacionesCultivosAppRoutes = require('./routes/app.recomendacionescultivos.routes');
const usuariosAppRoutes = require('./routes/app.usuarios.routes');
const rolesAppRoutes = require('./routes/app.roles.routes');
const usuariosRolesAppRoutes = require('./routes/app.usuariosroles.routes');



const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cultivos', cultivosRoutes);
app.use('/api/mensajes', mensajesRoutes);
app.use('/api/recomendaciones', recomendacionesRoutes);

app.use('/api/app/cultivos', cultivosAppRoutes);
app.use('/api/app/fertilizantes', fertilizantesAppRoutes);
app.use('/api/app/recomendaciones', recomendacionesAppRoutes);
app.use('/api/app/cultivos-fertilizantes', cultivosFertilizantesAppRoutes);
app.use('/api/app/mensajes', mensajesAppRoutes);
app.use('/api/app/tipos-fertilizantes', tiposFertilizantesAppRoutes);
app.use('/api/app/recomendaciones', recomendacionesAppRoutes);
app.use('/api/app/recomendaciones-cultivos', recomendacionesCultivosAppRoutes);
app.use('/api/app/usuarios', usuariosAppRoutes);
app.use('/api/app/roles', rolesAppRoutes);
app.use('/api/app/usuarios-roles', usuariosRolesAppRoutes);





const PORT = process.env.PORT || 3276;
app.listen(PORT, () => {
  console.log(`AgroAmigo API corriendo en puerto ${PORT}`);
});