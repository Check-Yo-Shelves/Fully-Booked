const router = require("express").Router();
const { Library, LibraryBook, Book, User } = require("../../models");
const { geoCoder } = require("../../utils/geocodeHelper");

// Get all libaries (GET)
// WORKS
router.get("/", async (req, res) => {
  try {
    const libraryData = await Library.findAll({
      include: [{
        model: User,
        attributes: { exclude: ['password'] }
      }]
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
      include: [{
        model: User,
        attributes: { exclude: ['password'] }
      }],
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
  let geoResponse = await geoCoder.geocode(req.body.address, req.body.zip_code);
  let newLibrary = {
    name: req.body.name,
    zip_code: req.body.zip_code,
    address: req.body.address,
    user_id: req.session.user_id,
    lat: 41.900589,
    lon: -87.679611,
  };
  if (geoResponse) {
    newLibrary.lat = geoResponse[0].latitude;
    newLibrary.lon = geoResponse[0].longitude;
  }

  try {
    const libraryData = await Library.create(newLibrary);
    res.status(200).json(libraryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update an owned libary (PUT)
// WORKS
router.put('/:id', async (req, res) => {
  try {
    let geoResponse = await geoCoder.geocode(req.body.address, req.body.zip_code);
    let updatedLibrary = {
      name: req.body.name,
      zip_code: req.body.zip_code,
      address: req.body.address,
      user_id: req.session.user_id,
      lat: 41.900589,
      lon: -87.679611,
    };
    if (geoResponse) {
      updatedLibrary.lat = geoResponse[0].latitude;
      updatedLibrary.lon = geoResponse[0].longitude;
    }
    const libraryData = await Library.update(updatedLibrary, {
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
    res.status(200).json({ message: `Library with ID: ${req.params.id} deleted.` })
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
