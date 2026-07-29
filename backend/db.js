const { Pool } = require('pg');


const pool = new Pool({
  user: process.env.POSTGRES_USER || 'user',
  host: process.env.HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'todoapp',
  password: process.env.POSTGRES_PASSWORD || 'user',
  port: 5432,
});

module.exports = pool;
