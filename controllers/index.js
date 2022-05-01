// Handles all routes for homepage, dashboard, login/signup.
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require(`./homeroutes`);
const dashboardRoutes = require(`./dashboardroutes`);
const loginRoutes = require(`./loginroutes`);

router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use(`/login`, loginRoutes);
router.use('/', homeRoutes);

module.exports = router;
