/* eslint-disable no-console */
const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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

const csvWriter = createCsvWriter({
  path: './database/data-storage/restaurants_records.csv',
  header: [
    { id: 'name', title: 'name' },
    { id: 'phone', title: 'phone' },
    { id: 'email', title: 'email' },
    { id: 'city', title: 'city' },
    { id: 'state', title: 'state' },
    { id: 'zip', title: 'zip' },
  ],
});

const recordsGenerator = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i += 1) {
    if (i % 500000 === 0) {
      console.log(`Successfully seeded up to ${i} records.`);
    }
    const restaurant = {
      name: generateRestaurantName(),
      phone: generatePhoneNumber(),
      email: generateRandomEmail(),
      city: generateRandomCity(),
      state: generateRandomState(),
      zip: generateRandomZip(),
    };
    result.push(restaurant);
  }
  return result;
};

const restaurantRecordsBuilder = recordsGenerator(1, 5000000);

csvWriter.writeRecords(restaurantRecordsBuilder) // returns a promise
  .then(() => {
    console.log('Done Writing Restaurant Records to Csv file.');
  });
