const Pool = require('pg').Pool;

const pool = new Pool({
  connectionString: process.env.DATABASE_URLAPP,
  ssl: {
    rejectUnauthorized: false
  }
});
module.exports = pool;