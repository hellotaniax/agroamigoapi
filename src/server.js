const app = require('./app');

const PORT = process.env.PORT || 3276;

app.listen(PORT, () => {
  console.log(`API AgroAmigo corriendo en puerto ${PORT}`);
});