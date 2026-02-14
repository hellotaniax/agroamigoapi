const { Pool } = require('pg');

const poolApp = new Pool({
  connectionString: process.env.DATABASE_URLADMIN,
  ssl: false
});

module.exports = poolApp;