/* eslint-disable camelcase */
/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  user: 'billysmac',
  database: 'dishes',
});

client.connect()
  .then(() => console.log('Successful Connection to Postgresql'))
  .catch((err) => console.error('Error: ', err.stack));

// Inner Join all three in one Query
// const getRestaurantInfo = (restaurantId, callback) => {
//   const query = `SELECT * FROM restaurants INNER JOIN dishes ON
//    restaurants.restaurant_id = dishes.restaurant_id INNER JOIN reviews
//    ON dishes.dish_id = reviews.dish_id AND restaurants.restaurant_id = ${restaurantId}`;
//   client.query(query, (err, result) => {
//     if (err) callback(err);
//     else callback(null, result.rows);
//   });
// };

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

const getDishesAndReviews = (restaurantId, callback) => {
  const query = `SELECT * FROM dishes
  JOIN reviews ON dishes.dish_id = reviews.dish_id AND dishes.restaurant_id = ${restaurantId}`;
  client.query(query, (err, result) => {
    if (err) callback(err);
    else callback(null, result.rows);
  });
};

const addDish = (dish, callback) => {
  const { dish_name, description, photo } = dish;
  const restaurant_id = Number(dish.restaurant_id);
  const query = 'INSERT INTO dishes (restaurant_id, dish_name, description, photo) VALUES ($1, $2, $3, $4);';
  const values = [restaurant_id, dish_name, description, photo];
  client.query(query, values, (err, result) => {
    if (err) callback(err);
    callback(null, result);
  });
};

module.exports = {
  client,
  getRestaurantInfo,
  getDishesAndReviews,
  addDish,
};
