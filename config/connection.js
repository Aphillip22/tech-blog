// import Sequelize constructor from library
const Sequelize = require('sequelize');
const uri = 'heroku_033f2d7fd825089';
const username = 'b14991b282fc47';
const pw = '7e3e65e5';
const host = 'http://us-cdbr-east-02.cleardb.com/'
require('dotenv').config();

// create connection to database
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(uri, username, pw, {
      host: host,
      dialect: 'mysql',
      port: 3306
    });

module.exports = sequelize;