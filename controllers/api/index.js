const router = require('express').Router();
const libraryRoutes = require('./libraryRoutes');
const userRoutes = require('./userRoutes');
const libraryBookRoutes = require('./libraryBookRoutes');

router.use('/users', userRoutes);
// library route
router.use('/library', libraryRoutes);
// librarybook route
router.use('/librarybook', libraryBookRoutes);
// book routes

module.exports = router;
