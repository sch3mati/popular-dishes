/* eslint-disable no-console */
const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Helpers ------------------------------------------

const generateUsername = () => faker.internet.userName();
const generateAvatarUrl = () => {

};

const csvWriter = createCsvWriter({
  path: './database/data-storage/users_records.csv',
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
  const result = [];
  for (let i = start; i <= end; i += 1) {
    if (i % 50000 === 0) {
      console.log(`Successfully seeded up to ${i} records.`);
    }
    const restaurant = {
      user_id: i,
      username: generateUsername(),
      avatar: generateAvatarUrl(),
      vip_status: faker.random.boolean(),
    };
    result.push(restaurant);
  }
  return result;
};

const usersRecordsBuilder = recordsGenerator(1, 500000);

csvWriter.writeRecords(usersRecordsBuilder) // returns a promise
  .then(() => {
    console.log('Done Seeding.');
  });
