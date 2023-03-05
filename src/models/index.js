'use strict';

require('dotenv').config();
const { Sequelize, DataTypes} = require('sequelize');
const animal = require('./animal');
const Collection = require('./collection');

// if sqlite::memory does not work, use sqlite:memory
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

// db singleton
const sequelizeDatabase = new Sequelize(DATABASE_URL);

const animalModel = animal(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  animalCollection: new Collection(animalModel),
};
