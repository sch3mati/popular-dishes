/* eslint-disable no-console */
const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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

const csvWriter = createCsvWriter({
  path: './database/data-storage/dishes_records.csv',
  header: [
    { id: 'restaurant_id', title: 'restaurant_id' },
    { id: 'name', title: 'name' },
    { id: 'description', title: 'description' },
    { id: 'photo', title: 'photo' },
  ],
});

const restaurantCount = 500;

const recordsGenerator = (restaurantNum) => {
  const result = [];
  for (let whichRestaurant = 1; whichRestaurant <= restaurantNum; whichRestaurant += 1) {
    // if (whichRestaurant % 500000 === 0) {
    //   console.log(`Seeded dishes for ${whichRestaurant} restaurants`);
    // }
    const dishCount = randomNumInclusive(1, 5);
    for (let whichDish = 1; whichDish <= dishCount; whichDish += 1) {
      const dish = {
        restaurant_id: whichRestaurant,
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
    console.log('Done Writing Dish records to csv');
  });
