const router = require('express').Router();
const { LibraryBook, User } = require('../../models');

// This route allows us to GET all libraryBooks
router.get('/', async (req, res) => {
    try {
        const libraryBookData = await LibraryBook.findAll({
            include: [{ model: User }],
        });

        res.status(200).json(libraryBookData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// This route allows us to GET libraryBooks by id
router.get('/:id', async (req, res) => {
    try {
        const libraryBookData = await LibraryBook.findByPk(req.params.id, {
            include: [{ model: User }],
        });

        if (!libraryBookData) {
            res.status(404).json({ message: `No library book found with that id!` });
            return;
          }

        res.status(200).json(libraryBookData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// This route allows both checking libraryBook both in and out.
router.put('/:id', async (req, res) => {
    try {
        // Update the libraryBook that is referenced by id with req.body parameters (which are user_id & checked_out property)
        // Logic for this will go in js folder.
        const libraryBookData = await LibraryBook.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!libraryBookData) {
            res.status(404).json({ message: `No library book found with that id!`});
            return;
        }

        res.status(200).json(libraryBookData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;