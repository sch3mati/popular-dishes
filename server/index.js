/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-path-concat */
/* eslint-disable prefer-template */
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/index.js');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/dishes/restaurant/:id', (req, res) => {
  console.log(req.params.id);
  db.getAllDishes(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send('request failed');
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
