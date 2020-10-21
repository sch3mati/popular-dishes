/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const fs = require('fs');
const faker = require('faker');

// Helpers ------------------------------------------

const dishNames = [
  'Haroset and plumcot cake',
  'Ricotta and peppercorn gyoza',
  'Fish and cod gyoza',
  'Fish and buffalo skewers',
  'Lamb and potato casserole',
  'Stilton and leek spaghetti',
  'Goat and bean curry',
  'Mascarpone and blackcurrant cheesecake',
  'Egg and cucumber sushi',
  'Game and turkey pie',
  'Treacle and stilton cupcakes',
  'Chilli and mustard seed soup',
  'Feta and napolitana pasta',
  'Celeriac and parsnip soup',
  'Apricot and butter loaf',
  'Goose and fettuccine salad',
  'Flaxseed and rice loaf',
  'Plumcot and fennel salad',
  'Fregola and italian dressing salad',
  'Potato and fish soup',
  'Soya margarine and bouquet garni salad',
  'Pigeon and stilton wontons',
  'Bean and sweetcorn risotto',
  'Tumeric and goat madras',
  'Squash and cardamom muffins',
  'Lemon and orange cupcakes',
  'Chickpea and sweetcorn pasta',
  'Buttermilk and buckwheat pancake',
  'Chicken and venison skewers',
  'Jaggery and bacon salad',
  'Apple and mint jam',
  'Navratan and tongue salad',
  'Cheddar and ginger loaf',
  'Feijoa and cod salad',
  'Courgette and pumpkin risotto',
  'Matzo farfel and saffron salad',
  'Pork and beef casserole',
  'Salt and pumpkin gnocchi',
  'Plantain and blackberry crepes',
  'Jalapeno and cucumber bagel',
  'Tomato and lamb penne',
  'Rabbit and fish casserole',
  'Kirschwasser and red leicester salad',
  'Garam masala and horseradish wontons',
  'Mandarine and clementine  salad',
  'Kalonji and star fruit salad',
  'Rhubarb and vanilla cheesecake',
  'Brie and apple ciabatta',
  'Marzipan and almond cake',
  'Coriander and leek wontons',
];

const generateDescription = () => faker.lorem.sentence(4, 4);
const randomNumInclusive = (minimum, maximum) => {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const generateDishName = () => dishNames[randomNumInclusive(0, 49)];
const generatePhotoUrl = () => {
  const url = 'https://hrsf130-tkout-photo-gallery.s3.us-east-2.amazonaws.com/sdc-dishes-photos/photo';
  const randomNum = randomNumInclusive(1, 900);
  return `${url}${randomNum}.jpg`;
};

const restaurantsCount = 2000000;
const dishesPerRestaurant = 4;
const filename = './database/postgres/data-storage/dishes_records.csv';
const stream = fs.createWriteStream(filename);

const createThreeDishes = (restaurantId) => {
  let result = '';
  for (let whichDish = 1; whichDish <= dishesPerRestaurant; whichDish += 1) {
    const restaurant_id = restaurantId;
    const name = generateDishName();
    const description = generateDescription();
    const photo = generatePhotoUrl();
    result += `${restaurant_id},${name},${description},${photo}\n`;
  }
  return result;
};

const writeFifteenMillionDishes = (writeStream, encoding, done) => {
  let i = restaurantsCount;
  function writing() {
    let restaurantId = 1;
    const canWrite = true;
    do {
      i--;
      const dishes = createThreeDishes(restaurantId);
      if (i % 500000 === 0) {
        console.log(`Successfully seeded 4 dishes for ${2000000 - i} restaurants`);
      }
      if (i === 0) {
        // we are done, fire callback
        writeStream.write(dishes, encoding, done);
      } else {
        // we are not done so dont fire callback
        writeStream.write(dishes, encoding);
        restaurantId++;
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
stream.write('restaurant_id,name,description,photo\n', 'utf-8');
// invoke writeFiveMillionRestaurants and pass callback
writeFifteenMillionDishes(stream, 'utf-8', () => {
  stream.end();
});
