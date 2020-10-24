/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const fs = require('fs');
const faker = require('faker');

const restaurantsCount = 2000000;
const filename = './database/cassandra/data-storage/restaurants_records.csv';
const stream = fs.createWriteStream(filename);

const generateRestaurantName = () => {
  const suffixArray = ['Place', 'Joint', 'Grill', 'Parlor', 'Steakhouse', 'Burgers', 'Deli',
    'Comfort House', 'Vegan', 'Sweets', 'Escape', 'Kitchen', 'Bistro', 'Eatery', 'BBQ'];
  return `${faker.name.firstName()}'s ${faker.random.arrayElement(suffixArray)}`;
};

const generatePhoneNumber = () => faker.phone.phoneNumberFormat();
const generateRandomEmail = () => faker.internet.email();
const generateRandomCity = () => faker.address.city();
const generateRandomState = () => faker.address.stateAbbr();
const generateRandomZip = () => faker.address.zipCode();

const createRestaurant = (id) => {
  const restaurant_id = id;
  const name = generateRestaurantName();
  const phone = generatePhoneNumber();
  const email = generateRandomEmail();
  const city = generateRandomCity();
  const state = generateRandomState();
  const zip = generateRandomZip();

  return `${restaurant_id},${name},${phone},${email},${city},${state},${zip}\n`;
};

const writeRestaurants = (writeStream, encoding, done) => {
  let i = restaurantsCount;
  let restaurantId = 1;
  function writing() {
    const canWrite = true;
    do {
      i--;
      const restaurant = createRestaurant(restaurantId);
      if (i % 500000 === 0) {
        console.log(`Successfully seeded ${2000000 - i} restaurants`);
      }
      if (i === 0) {
        // we are done, fire callback
        writeStream.write(restaurant, encoding, done);
      } else {
        // we are not done so dont fire callback
        writeStream.write(restaurant, encoding);
        restaurantId += 1;
      }
      // else call write and continue looping
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      // our buffer for stream filled and need to wait for drain
      // Write some more once it drains.
      writeStream.once('drain', writing);
    }
  }
  // initiate our writing function
  writing();
};

// write our `header` line before we invoke the loop
stream.write('restaurant_id,name,phone,email,city,state,zip\n', 'utf-8');
// invoke writeRestaurants and pass callback
writeRestaurants(stream, 'utf-8', () => {
  stream.end();
});
