/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const fs = require('fs');
const faker = require('faker');

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
const generateDate = () => {
  const month = 9 + Math.round(Math.random() * 2);
  const day = randomNumInclusive(1, 30);
  const year = 2020;
  return `${year}-${month}-${day}`;
};
const generateStars = () => faker.finance.amount(3.1, 5, 1);

const dishCount = 8000000;
const reviewsPerDish = 3;

const filename = './database/postgres/data-storage/reviews_records.csv';
const stream = fs.createWriteStream(filename);

const createThreeReviews = (dishId) => {
  let result = '';
  for (let whichReview = 1; whichReview <= reviewsPerDish; whichReview += 1) {
    const dish_id = dishId;
    const user_id = generateUserId();
    const username = generateUsername();
    const avatar = generateAvatarUrl();
    const vip_status = generateVipStatus();
    const review = generateReview();
    const date = generateDate();
    const stars = generateStars();
    result += `${dish_id},${user_id},${username},${avatar},${vip_status},${review},${date},${stars}\n`;
  }
  return result;
};

const writeFifteenMillionReviews = (writeStream, encoding, done) => {
  let i = dishCount;
  function writing() {
    let dishId = 1;
    let canWrite = true;
    do {
      i--;
      const dishes = createThreeReviews(dishId);
      if (i % 500000 === 0) {
        console.log(`Successfully seeded 3 reviews for ${8000000 - i} dishes`);
      }
      if (i === 0) {
        // we are done, fire callback
        writeStream.write(dishes, encoding, done);
      } else {
        // we are not done so dont fire callback
        canWrite = writeStream.write(dishes, encoding);
        dishId++;
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
stream.write('dish_id,user_id,username,avatar,vip_status,review,date,stars\n', 'utf-8');
// invoke writeFifteenMillionReviews and pass callback
writeFifteenMillionReviews(stream, 'utf-8', () => {
  stream.end();
});
