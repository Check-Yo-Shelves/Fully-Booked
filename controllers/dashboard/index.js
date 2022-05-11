const router = require('express').Router();
const dashboardRoutes = require('./dashboardRoutes');

router.use('/', dashboardRoutes);

module.exports = router;
