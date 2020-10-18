/* eslint-disable no-console */
const fs = require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

// Helpers ------------------------------------------
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

const dataGenerator = async () => {
  const createRestaurantsRecords = async () => {
    writer.pipe(fs.createWriteStream('./database/data-storage/restaurants.csv'));
    for (let i = 1; i <= 10000000; i += 1) {
      if (i % 500000 === 0) {
        console.log(`Successfully seeded ${i} records`);
      }
      writer.write({
        restaurant_id: i,
        name: generateRestaurantName(),
        phone: generatePhoneNumber(),
        email: generateRandomEmail(),
        city: generateRandomCity(),
        state: generateRandomState(),
        zip: generateRandomZip(),
      });
    }
    writer.end();
    console.log('Successfully Generated 10Mil Restaurant Records into csv');
  };
  await createRestaurantsRecords();
};
dataGenerator();

// const csvWriter = createCsvWriter({
//   path: './database/data-storage/restaurants.csv',
//   header: [
//     { id: 'restaurant_id', title: 'restaurant_id' },
//     { id: 'name', title: 'name' },
//     { id: 'phone', title: 'phone' },
//     { id: 'email', title: 'email' },
//     { id: 'city', title: 'city' },
//     { id: 'state', title: 'state' },
//     { id: 'zip', title: 'zip' },
//   ],
// });

// const recordsGenerator = (start, end) => {
//   const result = [];
//   for (let i = start; i <= end; i += 1) {
//     if (i === 50 || i === 100 || i === 150) {
//       console.log(`Successfully seeded up to ${i} records.`);
//     }
//     const restaurant = {
//       restaurant_id: i,
//       name: generateRestaurantName(),
//       phone: generatePhoneNumber(),
//       email: generateRandomEmail(),
//       city: generateRandomCity(),
//       state: generateRandomState(),
//       zip: generateRandomZip(),
//     };
//     result.push(restaurant);
//   }
//   return result;
// };

// const restaurantRecordsBuilder = recordsGenerator(1, 200);

// csvWriter.writeRecords(restaurantRecordsBuilder) // returns a promise
//   .then(() => {
//     console.log('Done Seeding.');
//   });
