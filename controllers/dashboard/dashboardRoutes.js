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
//Get methods (passing data to handlebars)
//create book (ISBN)
// const withAuth = require('../../utils/auth');


router.get('/libraries', withAuth, async (req, res) => {
  try {
    const Book = await User.findAll({
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
// todo
router.delete('/librarybook/:id', withAuth, async (req, res) => {
  try {
    const Book = await User.findAll({
      // attributes: { exclude: ['password'] },
      order: [['name', 'ISBN']],
    });
  }catch{
    if(err){
      console.log(err,"Delete book")
    }else{
      console.log("Route hit for /librarybook/:id")
    }

  }
});
//create library (post)
router.post('/library', withAuth, async (req, res) => {
  try {
    const Library = await User.findAll({
      // attributes: { exclude: ['password'] },
      order: [['name', 'address']],
    });
  }catch{
    if(err){
      console.log(err,"Post library")
    }else{
      console.log("Route hit for /library")
    }

  }
})
//update library (get)
// todo
router.put('/library/:id', withAuth, async (req, res) => {
  try {
    const Library = await User.findAll({
      // attributes: { exclude: ['password'] },
      order: [['name', 'address']],
    });
  }catch{
    if(err){
      console.log(err,"update library")
    }else{
      console.log("Route hit for /library/:id")
    }

  }
})

module.exports = router;

