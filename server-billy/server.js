/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index');

const app = express();
const port = 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Routes-------

// GET restaurant info from restaurant id

// GET all dishes for a restaurant
app.get('/api/restaurants/:restaurantId/dishes', (req, res) => {
  // console.log('Req Params: ', req.params);
  db.getRestaurantInfo(req.params.restaurantId, (err, restaurantData) => {
    const finalResponse = restaurantData[0];
    console.log('Dish Data in server get request: ', restaurantData);
    if (err) {
      res.status(400).send();
    } else {
      db.getDishesFromRestaurant(req.params.restaurantId, (errDishes, dishData) => {
        if (errDishes) {
          res.status(400).send();
          console.log('Error inside getDishesFromRestaurant');
        } else {
          const result = dishData.map((dish) => dish);
          finalResponse.dishes = result;
          res.status(200).send(finalResponse);
        }
      });
    }
  });
});
// app.get('/api/restaurants/:restaurantId/dishes', (req, res) => {
//   // console.log('Req Params: ', req.params);
//   db.getRestaurantInfo(req.params.restaurantId, (err, restaurantData) => {
//     console.log('Dish Data in server get request: ', restaurantData);
//     if (err) {
//       res.status(400).send();
//     } else {
//       res.status(200).send(restaurantData);
//     }
//   });
// });
// app.get('/api/restaurants/:restaurantId/dishes', (req, res) => {
//   // console.log('Req Params: ', req.params);
//   db.getDishesFromRestaurant(req.params.restaurantId, (err, dishData) => {
//     console.log('Dish Data in server get request: ', dishData);
//     if (err) {
//       res.status(400).send();
//     } else {
//       res.status(200).send(dishData);
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
