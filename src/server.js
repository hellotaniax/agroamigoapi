require('dotenv').config();
const app = require('./app'); // Importa el archivo de arriba

const PORT = process.env.PORT || 3276;

app.listen(PORT, () => {
  console.log(`✅ API AgroAmigo corriendo en puerto ${PORT}`);
});