// import Sequelize constructor from library
const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to database
const sequelize = process.env.CLEARDB_DATABASE_URL
  ? new Sequelize(process.env.CLEARDB_DATABASE_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: host,
      dialect: 'mysql',
      port: 3306
    });


module.exports = sequelize;