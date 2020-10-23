/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  user: 'billysmac',
  database: 'dishes',
});

client.connect()
  .then(() => console.log('Successful Connection to Postgresql'))
  .catch((err) => console.error('Error: ', err.stack));

const getDishesFromRestaurant = (restaurantId, callback) => {
  const query = `SELECT * FROM dishes WHERE restaurant_id = ${restaurantId}`;
  client.query(query, (err, result) => {
    console.log('Res from getDishesFromRestaurant: ', result.rows);
    if (err) {
      callback(err);
    } else {
      callback(null, result.rows);
    }
  });
};

module.exports = {
  client,
  getDishesFromRestaurant,
};
