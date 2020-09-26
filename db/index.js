/* eslint-disable no-console */
const mysql = require('mysql');
const dbConfig = require('./config.js');

const connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('CONNECTED TO DB!');
  }
});

module.exports = connection;
