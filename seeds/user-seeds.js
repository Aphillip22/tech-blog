const { User } = require('../models');

const userData = [
  {
    username: "Aphillip22",
    email: "amber@gmail.com",
    password: "password123"
  },
  {
    username: "Rfw88",
    email: "robert@gmail.com",
    password: "password456"
  },
  {
    username: "kSlade",
    email: "kastian@gmail.com",
    password: "password789"
  },
  {
    username: "anon123",
    email: "anonymous@gmail.com",
    password: "123password"
  },
  {
    username: "user87",
    email: "youser@gmail.com",
    password: "456password"
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;