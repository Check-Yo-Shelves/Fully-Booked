const router = require('express').Router();
const { User, Library, LibraryBook, Book } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get User's checked owned libraries to display here.
    const userData = await User.findByPk(req.session.user_id, {

      include: [{ model: Library }, { model: LibraryBook }],
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });
    console.log(user);

    let checkedOut = [];

    for (let i = 0; i < user.librarybooks.length; i++) {
      checkedOut.push(user.librarybooks[i].book_id);
    }
    console.log("Checked out Array", checkedOut);

    const bookData = await Book.findAll({
      where: {
        id: checkedOut,
      },
    });
    // console.log(bookData);

    const books = bookData.map((book => book.get({ plain: true })));
    console.log("Checked out books", books);

    res.render('dashboard', {
      user,
      books,
      logged_in: req.session.logged_in,
    });
    console.log('Dashboard Route OK');
  } catch (err) {
    res.status(500).json(err);
  }
});

//create book (ISBN)

router.get('/libraries/:id', withAuth, async (req, res) => {
  try {
    const book = await User.findAll({
      // attributes: { exclude: ['password'] },
      order: [['name', 'ISBN']],
    });
  }catch{
    if(err){
      console.log(err,"get libraries")
    }else{
      console.log("Route hit for /libraries")
    }

  }
});
//delete book (delete)

// router.delete('/librarybook/:id', withAuth, async (req, res) => {
//   try {
//     const book = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ISBN']],
//     });
//   }catch{
//     if(err){
//       console.log(err,"Delete book")
//     }else{
//       console.log("Route hit for /librarybook/:id")
//     }

//   }
// });
//create library
router.get('/library', async (req, res) => {
  try {
    res.render('createlibrary', {
      logged_in: req.session.logged_in,
    });
    console.log('Library Created');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/library/:id', async (req, res) => {
  try {
    // Get User's checked owned libraries to display here.
    const libraryData = await Library.findByPk(req.params.id,
      {
        include: [{ model: Book, through: LibraryBook, as: 'book' }],
      });

    const library = libraryData.get({ plain: true });
    console.log(library);

    res.render('updatelibrary', { library, logged_in: req.session.logged_in, });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

