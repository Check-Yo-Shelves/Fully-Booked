const router = require('express').Router();
const { User, Library, LibraryBook, Book } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/browse', async (req, res) => {
  try {
    res.render('browse');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/search', async (req, res) => {
  try {
    res.render('search');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Get User's checked out books and owned libraries to display here.
    // const libraryData = await Library.findAll({
    //   where: ,
    // })
    
    // const bookData = await Book.findAll({

    // });

    // const books = bookData.map((book) => book.get({ plain: true }));

    res.render('dashboard', {
      books,
      libraries,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
