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

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
