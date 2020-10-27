/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
require('newrelic');
const cluster = require('cluster');
const express = require('express');
const numCPUs = require('os').cpus().length;
const bodyParser = require('body-parser');
const db = require('../database/index');

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
} else {
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
    const dish = req.body;
    dish.restaurant_id = req.params.restaurantId;
    db.addDish(dish, (err) => {
      if (err) res.status(401).send('Could not insert dish');
      res.status(201).send(`Successfully added dish to restaurant ${req.params.restaurantId}`);
    });
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}
