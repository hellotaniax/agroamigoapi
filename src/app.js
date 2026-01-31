require('dotenv').config();
const express = require('express');
const cors = require('cors');

const cultivosRoutes = require('./routes/cultivos.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cultivos', cultivosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AgroAmigo API corriendo en puerto ${PORT}`);
});