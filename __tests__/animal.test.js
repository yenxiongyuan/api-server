'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const { sequelizeDatabase } = require('../src/models');
const request = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('REST API', () => {
  it('creates a animal', async () => {
    let response = await request.post('/animal').send({
      name: 'Dog',
      age: 3,
      pronouns: 'he/him',
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Dog');
    expect(response.body.age).toEqual(3);
    expect(response.body.pronouns).toEqual('he/him');
    expect(response.body.id).toBeTruthy();
  });

  it('gets animals', async () => {
    let response = await request.get('/animal');

    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('Dog');
    expect(response.body[0].age).toEqual(3);
    expect(response.body[0].pronouns).toEqual('he/him');
    expect(response.body[0].id).toBeTruthy();
  });
});
