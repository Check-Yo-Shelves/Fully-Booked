const router = require('express').Router();
const { User, Library, LibraryBook, Book } = require('../models');
const withAuth = require('../utils/auth');

// 
router.get('/', async (req, res) => {
  try {
    res.render('homepage');
    console.log('Root route OK');
    // Status
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/browse', async (req, res) => {
  try {
    const libraryData = await Library.findAll({
      include: [{ model: Book, through: LibraryBook, as: "books" }],
    });
    const libraries = libraryData.map((library => library.get({ plain: true })));

    res.render('browse', { libraries });
    console.log('Browse route OK');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/search', async (req, res) => {
  try {
    res.render('search');
    console.log('Search route OK');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('dashboard');
    console.log('Login route OK');
    return;
  }

  res.render('login');
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Get User's checked owned libraries to display here.
    const userData = await User.findByPk(req.session.user_id, {
    
      include: [{ model: Library }, { model: Book, through: LibraryBook, as: 'books' }],
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });
    console.log(user);

    res.render('dashboard', {
      user,
      logged_in: req.session.logged_in,
    });
    console.log('Dashboard Route OK');
  } catch (err) {
    res.status(500).json(err);
  
  }
});

router.get('/libraryinfo/:id', async (req, res) => {
  try {
    // Get User's checked owned libraries to display here.
    const libraryData = await Library.findByPk(req.params.id,
      {
        include: [{ model: Book, through: LibraryBook, as: 'books' }],
      });

    const library = libraryData.get({ plain: true });
    console.log(library);
    // Add

    res.render('libraryinfo', { library });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
