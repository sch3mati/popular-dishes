/* eslint-disable no-console */
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'file.csv',
  header: [
    { id: 'Number', name},
    { id: 'lang', title: 'LANGUAGE' },
  ],
});

const records = [
  { name: 'Bob', lang: 'French, English' },
  { name: 'Mary', lang: 'English' },
];

csvWriter.writeRecords(records) // returns a promise
  .then(() => {
    console.log('...Done');
  });

// This will produce a file path/to/file.csv with following contents:
//
//   NAME,LANGUAGE
//   Bob,"French, English"
//   Mary,English
