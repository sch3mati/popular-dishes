/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../database');

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
const port = 5000;

// Routes-------

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
