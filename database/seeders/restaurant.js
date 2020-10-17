/* eslint-disable no-console */
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'file.csv',
  header: ['restaurant_id', 'name', 'phone', 'email', 'city', 'state', 'zip'],
});

const records = [
  {
    restaurant_id: '1234', name: 'Julienne Tomatoes', phone: '555-834-1222', email: 'jt@google.com', city: 'Petoskey', state: 'MI', zip: '49770',
  },
];

csvWriter.writeRecords(records) // returns a promise
  .then(() => {
    console.log('...Done');
  });
