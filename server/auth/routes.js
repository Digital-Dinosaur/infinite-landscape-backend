'use strict';

const express = require('express');
const router = express.Router();

const { users } = require('./models');
const basicAuth = require('./middleware/basic.js');
const bearerAuth = require('./middleware/bearer.js');

router.post('/signup', async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      throw new Error('Need to enter value in all fields');
    }
    let userRecord = await users.create(req.body);
    res.status(200).json(userRecord);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/signin', basicAuth, (req, res, next) => {
  res.status(200).json(req.user);
});

router.get('/users', bearerAuth, async (req, res, next) => {
  let userTable = await users.findAll({});
  res.status(200).json(userTable);
});

module.exports = router;
