/* eslint-disable no-console */
const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

// Helpers ------------------------------------------

const randomNumInclusive = (minimum, maximum) => {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const generateAvatarUrl = () => {
  const url = 'https://hrsf130-tkout-photo-gallery.s3.us-east-2.amazonaws.com/sdc-avatars-photos/';
  const randomNum = randomNumInclusive(1, 68);
  return `${url}${randomNum}.jpg`;
};
const generateUserId = () => faker.finance.account();
const generateUsername = () => faker.internet.userName();
const generateVipStatus = () => faker.random.boolean();
const generateReview = () => faker.lorem.paragraph();
const generateDate = () => faker.date.recent(90);
const generateStars = () => faker.finance.amount(3.1, 5, 1);

// Seed & write to csv file ------------------------------------------
const dishCount = 7500000;
const reviewsPerDish = 3;
const dataGen = async () => {
  const reviewsGenerator = async () => {
    writer.pipe(fs.createWriteStream('./database/data-storage/reviews3_records.csv'));
    for (let whichDish = 5000001; whichDish <= dishCount; whichDish += 1) {
      if (whichDish % 500000 === 0) {
        console.log(`Seeded 3 reviews for ${whichDish} dishes`);
      }
      for (let whichReview = 1; whichReview <= reviewsPerDish; whichReview += 1) {
        writer.write({
          dish_id: whichDish,
          user_id: generateUserId(),
          username: generateUsername(),
          avatar: generateAvatarUrl(),
          vip_status: generateVipStatus(),
          review: generateReview(),
          date: generateDate(),
          stars: generateStars(),
        });
      }
    }
    writer.end();
    console.log('Done');
  };
  await reviewsGenerator();
};
dataGen();
