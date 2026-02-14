require('dotenv').config();
const express = require('express');
const cors = require('cors');

// ===============================
// Importación de rutas
// ===============================

// Rutas de autenticación
const authRoutes = require('./routes/auth.routes');

// Rutas del agente
const cultivosRoutes = require('./routes/agente.cultivos.routes');
const mensajesRoutes = require('./routes/agente.mensajes.routes');
const recomendacionesRoutes = require('./routes/agente.recomendaciones.routes');


// Rutas de la aplicación

// Catálogos
const tiposCultivosAppRoutes = require('./routes/app.tiposcultivos.routes');
const tiposFertilizantesAppRoutes = require('./routes/app.tiposfertilizantes.routes');
const rolesAppRoutes = require('./routes/app.roles.routes');
const estadosAppRoutes = require('./routes/app.estados.routes');
const prioridadesAppRoutes = require('./routes/app.prioridades.routes');
const etapasAppRoutes = require('./routes/app.etapas.routes');

// Funcionalidades
const cultivosAppRoutes = require('./routes/app.cultivos.routes');
const fertilizantesAppRoutes = require('./routes/app.fertilizantes.routes');
const mensajesAppRoutes = require('./routes/app.mensajes.routes');
const recomendacionesAppRoutes = require('./routes/app.recomendaciones.routes');
const usuariosAppRoutes = require('./routes/app.usuarios.routes');



// Middleware global de errores
const errorHandler = require('./middlewares/errorhandler.middleware');

// ===============================
// Crear aplicación Express
// ===============================
const app = express();

// ===============================
// Middlewares globales
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// Rutas del agente
// ===============================
app.use('/api/cultivos', cultivosRoutes);
app.use('/api/mensajes', mensajesRoutes);
app.use('/api/recomendaciones', recomendacionesRoutes);

// ===============================
// Rutas de la aplicación
// ===============================

// Catálogos
app.use('/api/app/roles', rolesAppRoutes);
app.use('/api/app/tipos-fertilizantes', tiposFertilizantesAppRoutes);
app.use('/api/app/tipos-cultivos', tiposCultivosAppRoutes);
app.use('/api/app/estados', estadosAppRoutes);
app.use('/api/app/prioridades', prioridadesAppRoutes);
app.use('/api/app/etapas', etapasAppRoutes);


// Funcionalidades
app.use('/api/app/cultivos', cultivosAppRoutes);
app.use('/api/app/fertilizantes', fertilizantesAppRoutes);
app.use('/api/app/mensajes', mensajesAppRoutes);
app.use('/api/app/recomendaciones', recomendacionesAppRoutes);
app.use('/api/app/usuarios', usuariosAppRoutes);


// ===============================
// Rutas de autenticación
// ===============================
app.use('/api/app/auth', authRoutes);

// ===============================
// Ruta de salud del servicio
// ===============================
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'AgroAmigo API'
  });
});

// ===============================
// Middleware global de errores
// ⚠️ SIEMPRE debe ir al final
// ===============================
app.use(errorHandler);

// ===============================
// Exportar aplicación
// ===============================
module.exports = app;
