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

const getAllDishes = (restrId, cb) => {
  const sql = `select * from dishes where restr_id = ${restrId};`;
  connection.query(sql, (err, result) => {
    if (err) {
      return cb(err);
    }
    cb(err, result);
  });
};

module.exports = {
  getAllDishes,
};
