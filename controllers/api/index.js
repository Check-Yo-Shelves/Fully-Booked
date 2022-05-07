const router = require('express').Router();
const userRoutes = require('./userRoutes');
const libraryBookRoutes = require('./libraryBookRoutes');

router.use('/users', userRoutes);
// library route
// librarybook route
router.use('/librarybook', libraryBookRoutes);
// book routes

module.exports = router;
