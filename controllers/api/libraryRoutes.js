const router = require("express").Router();
const { Library, LibraryBook, Book, User } = require("../../models");

// Get all libaries (GET)
// WORKS
router.get("/", async (req, res) => {
  try {
    const libraryData = await Library.findAll({
      include: [{ model: User }],
    });
    res.status(200).json(libraryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Distance search by latitude or longitude

// Get libraries by ZIP (GET)
// WORKS
router.get("/:zip_code", async (req, res) => {
  try {
    const libraryData = await Library.findAll({
      where: {
        zip_code: req.params.zip_code,
      },
      include: [{ model: User }],
    });
    console.log(libraryData);
    if (!libraryData.length) {
      console.log("That aint it.");
      console.log(libraryData.zip_code);
      res
        .status(400)
        .json({ message: "No libraries matching that ZIP code. Please try again." });
      return;
    } else {
        res.status(200).json(libraryData);
    } 
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a new library (POST)
// WORKS
router.post('/', async (req, res) => {
    try {
      const libraryData = await Library.create(req.body);
      res.status(200).json(libraryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// Update an owned libary (PUT)
// WORKS
router.put('/:id', async (req, res) => {
    try {
      const libraryData = await Library.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!libraryData) {
        res.status(404).json({ message: 'No library with this id!' });
        return;
      }
      res.status(200).json(libraryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Delete an owned libary (DELETE)
// WORKS
router.delete('/:id', async (req, res) => {
    try {
      const libraryData = await Library.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!libraryData) {
        res.status(404).json({ message: 'No library found with that id!' });
        return;
      }
      res.status(200).json({ message: `Library with ID: ${req.params.id} deleted.`})
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;
