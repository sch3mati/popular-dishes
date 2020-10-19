/* eslint-disable no-console */
const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Helpers ------------------------------------------

const generateDishName = () => faker.lorem.words();
const generateDescription = () => faker.lorem.sentence(4, 4);
const randomNumInclusive = (minimum, maximum) => {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const generatePhotoUrl = () => {
  const url = 'https://hrsf130-tkout-photo-gallery.s3.us-east-2.amazonaws.com/sdc-dishes-photos/photo';
  const randomNum = randomNumInclusive(1, 900);
  return `${url}${randomNum}.jpg`;
};

const csvWriter = createCsvWriter({
  path: './database/data-storage/dishes_records.csv',
  header: [
    { id: 'dish_id', title: 'dish_id' },
    { id: 'name', title: 'name' },
    { id: 'description', title: 'description' },
    { id: 'photo', title: 'photo' },
  ],
});

const restaurantCount = 100;

const recordsGenerator = (restaurantNum) => {
  const result = [];
  for (let whichRestaurant = 1; whichRestaurant <= restaurantNum; whichRestaurant += 1) {
    const dishCount = Math.floor(Math.random() * 7);
    for (let whichDish = 1; whichDish <= dishCount; whichDish += 1) {
      const dish = {
        dish_id: whichDish,
        name: generateDishName(),
        description: generateDescription(),
        photo: generatePhotoUrl(),
      };
      result.push(dish);
    }
  }
  return result;
};

const dishesRecordsBuilder = recordsGenerator(restaurantCount);

csvWriter.writeRecords(dishesRecordsBuilder) // returns a promise
  .then(() => {
    console.log('Done Seeding.');
  });
