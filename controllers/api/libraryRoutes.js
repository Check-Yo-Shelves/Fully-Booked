const router = require("express").Router();
const { Library, LibraryBook, Book, User } = require("../../models");

// Get all libaries (GET)
router.get("/", async (req, res) => {
  try {
      const libraryData = await Library.findAll();
      res.status(200).json(libraryData);
    } catch (err) {
    res.status(500).json(err);
  }
});

// Get libraries by ZIP (GET)
router.get("/zip", async (req, res) => {
  try {
    const libraryData = await Library.findAll({
      where: {
        zip_code: req.body.zip_code,
      },
    });
    // Error isn't thrown. -- ZIP code that doesn't match any libraries returns an empty array rather than an error.
    if (!libraryData) {
      res
        .status(400)
        .json({
          message: "No libraries found matching that ZIP. Please try again.",
        });
      return;
    }
    res.status(200).json(libraryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a new library (POST)

// Update an owned libary (PUT)

// Delete an owned libary (DELETE)

module.exports = router;
