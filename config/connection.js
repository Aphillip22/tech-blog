// import Sequelize constructor from library
const Sequelize = require('sequelize');
const uri = 'heroku_033f2d7fd825089';
const username = 'b14991b282fc47';
const pw = '99d8bdf0a7c1029';
const host = 'us-cdbr-east-02.cleardb.com'
require('dotenv').config();

// create connection to database
// const sequelize = !process.env.JAWSDB_URL
  // ? new Sequelize('mysql://b14991b282fc47:99d8bdf0a7c1029@us-cdbr-east-04.cleardb.com/heroku_033f2d7fd825089?reconnect=true')
  // : new Sequelize(uri, username, pw, {
      // host: host,
      // dialect: 'mysql',
      // port: 3306
    // });

    const sequelize = new Sequelize('mysql://b14991b282fc47:99d8bdf0a7c1029@us-cdbr-east-04.cleardb.com/heroku_033f2d7fd825089?reconnect=true');
    
module.exports = sequelize;