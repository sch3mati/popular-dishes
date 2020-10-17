/* eslint-disable no-console */
const fs = require('fs');
const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const db = require('../index.js');

const csvWriter = createCsvWriter({
  path: './database/data-storage/restaurants.csv',
  header: [
    { id: 'restaurant_id', title: 'restaurant_id' },
    { id: 'name', title: 'name' },
    { id: 'phone', title: 'phone' },
    { id: 'email', title: 'email' },
    { id: 'city', title: 'city' },
    { id: 'state', title: 'state' },
    { id: 'zip', title: 'zip' },
  ],
});

const recordsGenerator = (start, end) => {
  let result = [];
  for (var i = start; i <= end; i += 1) {
    let restaurant = {};
    restaurant.restaurant
  }
};

// Helper Functions

// Write Seeder Function Here
const seed = () => {

};

csvWriter.writeRecords(records) // returns a promise
  .then(() => {
    console.log('...Done');
  });
