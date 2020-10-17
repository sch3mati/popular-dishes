/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  database: 'dishes',
});

client.connect()
  .then(() => console.log('Successful Connection to Postgresql'))
  .catch((err) => console.error('Error: ', err.stack));

module.exports = {
  client,
};
