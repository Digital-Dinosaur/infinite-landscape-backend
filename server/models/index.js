'use strict';

const { Sequelize } = require('sequelize');
const Collection = require('./Collection');
const profileSchema = require('./profile');
const storySchema = require('./story');

const { DATABASE_URL, NODE_ENV } = process.env;

console.log('DATABASE_URL', DATABASE_URL);

const dbUrl = DATABASE_URL || 'postgresql://localhost:5432';

const config =
  NODE_ENV !== 'test'
    ? { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } }
    : {};

const sequelize = new Sequelize(dbUrl, config);

const profileCollection = new Collection(sequelize, 'profiles', profileSchema);
const storyCollection = new Collection(sequelize, 'stories', storySchema);

module.exports = {
  contentDb: sequelize,
  profileCollection: profileCollection,
  storyCollection: storyCollection,
};
