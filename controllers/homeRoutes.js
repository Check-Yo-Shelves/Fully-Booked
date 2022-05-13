const router = require("express").Router();
const { User, Library, LibraryBook, Book } = require("../models");
const withAuth = require("../utils/auth");
const { Op } = require("sequelize");

//
router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
    console.log("Root route OK");
    // Status
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/browse", async (req, res) => {
  try {
    const libraryData = await Library.findAll({
      include: [{ model: Book, through: LibraryBook, as: "books" }],
    });
    const libraries = libraryData.map((library) =>
      library.get({ plain: true })
    );

    res.render("browse", {
      libraries,
      logged_in: req.session.logged_in,
    });
    console.log("Browse route OK");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/search", async (req, res) => {
  try {
    res.render("search", {
      logged_in: req.session.logged_in,
    });
    console.log("Search route OK");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    console.log("Login route OK");
    return;
  }

  res.render("login");
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Get User's checked owned libraries to display here.
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Library }, { model: LibraryBook }],
      attributes: { exclude: ["password"] },
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

    const books = bookData.map((book) => book.get({ plain: true }));
    console.log("Checked out books", books);

    res.render("dashboard", {
      user,
      books,
      logged_in: req.session.logged_in,
    });
    console.log("Dashboard Route OK");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/libraryinfo/:id", async (req, res) => {
  try {
    // Get User's checked owned libraries to display here.
    const libraryData = await Library.findByPk(req.params.id, {
      include: [{ model: Book, through: LibraryBook, as: "books" }],
    });

    const library = libraryData.get({ plain: true });
    console.log(library);
    // Add

    res.render("libraryinfo", { library, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Search by title or author
router.get("/bookinfo/:title", async (req, res) => {
  try {
    // checkKeyword();
    console.log(req.params);
    // const keywords = ["%Dalek%", "%Project", "%Fox", "%Fantastic"];
    const bookInfo = await Book.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${req.params.title}%`,
            },
          },
          {
            author: {
              [Op.like]: `%${req.params.title}%`,
            },
          },
        ],
      },
    });

    const booksFound = bookInfo.map((book) => book.get({ plain: true }));
    const thing = booksFound;
    const [book] = thing;
    console.log(book.title);
    res.render("bookinfo", { book, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
