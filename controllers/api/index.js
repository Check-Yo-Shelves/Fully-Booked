const router = require('express').Router();
const libraryRoutes = require('./libraryRoutes');
const userRoutes = require('./userRoutes');
const libraryBookRoutes = require('./libraryBookRoutes');
const bookRoutes = require('./bookRoutes');

router.use('/users', userRoutes);
// library route
router.use('/library', libraryRoutes);
// librarybook route
router.use('/librarybook', libraryBookRoutes);
// book routes
router.use('/books', bookRoutes);

module.exports = router;
