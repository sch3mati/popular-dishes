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

// GET all dishes for a restaurant
app.get('/api/restaurants/:restaurantId/dishes', (req, res) => {
  // console.log('Req Params: ', req.params);
  db.getDishesFromRestaurant(req.params.restaurantId, (err, dishData) => {
    console.log('Dish Data in server get request: ', dishData);
    if (err) {
      res.status(400).send();
    } else {
      res.status(200).send(dishData);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
