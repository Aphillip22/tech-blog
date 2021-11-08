//include dependencies
// define paths
const path = require('path');
// dotenv configuration
require('dotenv').config();
// express
const express = require('express');
// controllers defined as routes
const routes = require('./controllers/');
// Sequelize
const sequelize = require('./config/connection');
// Handlebars
const exphbs = require('express-handlebars')
// Express-session
const session = require('express-session')
// Sequelize store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// helpers
const helpers = require('./utils/helpers');

// Initialize handlebars
const hbs = exphbs.create({ helpers });

// Initialize the server
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize sessions
const sess = {
  secret: 'Shh its a secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
      db: sequelize
  })
};

// path for static files
// app.use(express.static(path.join(__dirname, 'public')));

// proclaim handlebars as template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

// use routes in controllers directory
app.use(require('./controllers'));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening!`));
});