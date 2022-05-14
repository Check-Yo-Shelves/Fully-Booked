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

router.get("/libraryinfo/:id", async (req, res) => {
  try {
    // Get User's checked owned libraries to display here.
    const libraryData = await Library.findByPk(req.params.id, {
      include: [{ model: Book, through: LibraryBook, as: "books" }],
    });

    const library = libraryData.get({ plain: true });
    console.log(library);

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

    const books = bookInfo.map((book) => book.get({ plain: true }));
    // const thing = booksFound;
    // const [book] = thing;
    console.log(books);

    if(books.length){
      res.render("bookinfo", { books, logged_in: req.session.logged_in });
    } else {
      res.render("search", { message: "Book not found. Please try again.", logged_in: req.session.logged_in })
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/404', async (req, res) => {
  try {
    res.render("404page");
  }catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
