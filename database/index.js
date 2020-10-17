const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  database: 'dishes',
});

// const query = (text, params, callback) => pool.query(text, params, callback);

module.exports = {
  pool,
};
