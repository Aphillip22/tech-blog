//include dependencies
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

//define routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

//define error catch
router.use((req, res) => {
    res.status(404).end();
});

//export router
module.exports = router;