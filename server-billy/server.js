/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
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

// GET restaurant info, and dish and review data for particular restaurant id
// app.get('/api/restaurants/:restaurantId/dishes', (req, res) => {
//   db.getRestaurantInfo(req.params.restaurantId, (err, restaurantData) => {
//     if (err) res.status(400).send();
//     else res.status(200).send(restaurantData);
//   });
// });

app.get('/api/restaurants/:restaurantId/dishes', (req, res) => {
  // console.log('Req Params: ', req.params);
  db.getRestaurantInfo(req.params.restaurantId, (err, restaurantData) => {
    const finalResponse = restaurantData[0];
    if (err) {
      res.status(400).send();
    } else {
      db.getDishesAndReviews(req.params.restaurantId, (errDishesReviews, dishData) => {
        if (errDishesReviews) {
          res.status(400).send();
        } else {
          finalResponse.dishes = dishData;
          res.status(200).send(finalResponse);
        }
      });
    }
  });
});

app.post('/api/restaurants/:restaurantId/dishes', (req, res) => {
  // console.log(req.body);
  db.addDish(req.body, (err) => {
    if (err) res.status(401).send();
    else {
      res.status(201).send();
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
