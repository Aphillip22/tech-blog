//include dependencies
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

// Define api routes
router.use('/api', apiRoutes);

// Define homepage path
router.use('/', homeRoutes);

// Define dashboard path
router.use('/dashboard', dashboardRoutes);

// catch any routes that do not exist and return 404 error
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;