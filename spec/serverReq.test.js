/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
const request = require('supertest');
const app = require('../server/app');

describe('Test the paths to http://localhost:3001', () => {
  test('It should response the GET method to the root path', (done) => {
    return request(app)
      .get('/')
      .expect(200).end(done);
  });
  test('It should response the GET method to the "/api/dishes/restaurant/:id" endpoint', (done) => {
    return request(app)
      .get(`/api/dishes/restaurant/${Math.floor(Math.random() * 100)}`)
      .expect(200).end(done);
  });
});
