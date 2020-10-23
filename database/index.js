/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  user: 'billysmac',
  database: 'dishes',
});

client.connect()
  .then(() => console.log('Successful Connection to Postgresql'))
  .catch((err) => console.error('Error: ', err.stack));

const getRestaurantInfo = (restaurantId, callback) => {
  const query = `SELECT * FROM restaurants WHERE restaurant_id = ${restaurantId}`;
  client.query(query, (err, result) => {
    // console.log('Res from getRestaurantInfo: ', result.rows);
    if (err) {
      callback(err);
    } else {
      callback(null, result.rows);
    }
  });
};

const getDishesFromRestaurant = (restaurantId, callback) => {
  const query = `SELECT * FROM dishes WHERE restaurant_id = ${restaurantId}`;
  client.query(query, (err, result) => {
    // console.log('Res from getDishesFromRestaurant: ', result.rows);
    if (err) {
      callback(err);
    } else {
      callback(null, result.rows);
    }
  });
};
// const getDishesFromRestaurant = (restaurantId, callback) => {
//   const query = `SELECT * FROM restaurants
//   JOIN dishes ON restaurants.restaurant_id = dishes.restaurant_id
//  AND restaurants.restaurant_id = ${restaurantId}`;
//   client.query(query, (err, result) => {
//     console.log('Res from getDishesFromRestaurant: ', result.rows);
//     if (err) {
//       callback(err);
//     } else {
//       callback(null, result.rows);
//     }
//   });
// };
// const getDishesFromRestaurant = (restaurantId, callback) => {
//   const query = `SELECT * FROM dishes WHERE restaurant_id = ${restaurantId}`;
//   client.query(query, (err, result) => {
//     console.log('Res from getDishesFromRestaurant: ', result.rows);
//     if (err) {
//       callback(err);
//     } else {
//       callback(null, result.rows);
//     }
//   });
// };

module.exports = {
  client,
  getRestaurantInfo,
  getDishesFromRestaurant,
};
