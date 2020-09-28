/* eslint-disable consistent-return */
/* eslint-disable no-console */
const mysql = require('mysql');
const dbConfig = require('./config.js');

const dbConnection = mysql.createConnection(dbConfig);
dbConnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('CONNECTED TO DB!');
  }
});

const getAllDishes = (restrId, cb) => {
  const sql = `select * from dishes where restr_id = ${restrId};`;
  dbConnection.query(sql, (err, result) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, result);
  });
};

const getDishReviews = (dishIds, cb) => {
  const sql = `select * from reviews where dish_id in (${dishIds.join(',')});`;
  dbConnection.query(sql, (err, result) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, result);
  });
};

const getUsers = (usersIds, cb) => {
  const sql = `select * from users where id in (${usersIds.join(',')});`;
  dbConnection.query(sql, (err, result) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, result);
  });
};

module.exports = {
  dbConnection,
  getAllDishes,
  getDishReviews,
  getUsers,
};
