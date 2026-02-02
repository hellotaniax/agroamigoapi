const { Pool } = require('pg');

const poolApp = new Pool({
  connectionString: process.env.DATABASE_URLAPP,
  ssl: false
});

module.exports = poolApp;