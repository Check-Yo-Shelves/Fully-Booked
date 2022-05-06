const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
// library route
// librarybook route
// book routes

module.exports = router;
