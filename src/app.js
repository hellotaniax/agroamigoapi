require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Rutas de autenticación
const authRoutes = require('./routes/auth.routes');

// Rutas del agente
const cultivosRoutes = require('./routes/agente.cultivos.routes');
const mensajesRoutes = require('./routes/agente.mensajes.routes');
const recomendacionesRoutes = require('./routes/agente.recomendaciones.routes');

// Rutas de la aplicación
const cultivosAppRoutes = require('./routes/app.cultivos.routes');
const fertilizantesAppRoutes = require('./routes/app.fertilizantes.routes');
const mensajesAppRoutes = require('./routes/app.mensajes.routes');
const tiposFertilizantesAppRoutes = require('./routes/app.tiposfertilizantes.routes');
const recomendacionesAppRoutes = require('./routes/app.recomendaciones.routes');
const usuariosAppRoutes = require('./routes/app.usuarios.routes');
const rolesAppRoutes = require('./routes/app.roles.routes');

// Crear la aplicación Express
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());

// Rutas del agente
app.use('/api/cultivos', cultivosRoutes);
app.use('/api/mensajes', mensajesRoutes);
app.use('/api/recomendaciones', recomendacionesRoutes);


// Rutas de la aplicación
app.use('/api/app/cultivos', cultivosAppRoutes);
app.use('/api/app/fertilizantes', fertilizantesAppRoutes);
app.use('/api/app/mensajes', mensajesAppRoutes);
app.use('/api/app/tipos-fertilizantes', tiposFertilizantesAppRoutes);
app.use('/api/app/recomendaciones', recomendacionesAppRoutes);
app.use('/api/app/usuarios', usuariosAppRoutes);
app.use('/api/app/roles', rolesAppRoutes);

// Rutas de autenticación
app.use("/api/app/auth", authRoutes);

// Ruta de salud del servicio
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'AgroAmigo API'
  });
});
// Exportar la aplicación
module.exports = app;


//Rutas nuevas (SOLO PRUEBA, NO HACER PUSH CON ESTO, SOLO PRUEBA LOCALMENTE)

const tiposCultivosAppRoutes = require('./routes/app.tiposcultivos.routes');

app.use('/api/app/tipos-cultivos', tiposCultivosAppRoutes);
