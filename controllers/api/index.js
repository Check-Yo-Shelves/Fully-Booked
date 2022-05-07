const router = require('express').Router();
const libraryRoutes = require('./libraryRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
// library route
router.use('/library', libraryRoutes);
// librarybook route
// book routes

module.exports = router;
