const { Pool } = require('pg');

const poolAgente = new Pool({
  connectionString: process.env.DATABASE_URLAGENTE,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = poolAgente;