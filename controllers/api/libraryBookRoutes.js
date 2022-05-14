const router = require('express').Router();
const { LibraryBook, User } = require('../../models');

// This route allows us to GET all libraryBooks
router.get('/', async (req, res) => {
    try {
        const libraryBookData = await LibraryBook.findAll({
            include: [{
                model: User,
                attributes: { exclude: ['password'] }
            }],
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
            include: [{
                model: User,
                attributes: { exclude: ['password'] }
            }],
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

// This route allows checking a libraryBook out.
router.put('/checkout/:id', async (req, res) => {
    try {
        console.log(req.session, req.params);
        req.body.user_id = req.session.user_id;
        const libraryBookData = await LibraryBook.update(req.body, {
            where: {
                id: req.params.id,
            },
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

// This route allows checking a libraryBook in (return).
router.put('/checkin/:id', async (req, res) => {
    try {
        console.log(req.session, req.params);
        const libraryBookData = await LibraryBook.update(req.body, {
            where: {
                book_id: req.params.id,
                user_id: req.session.user_id,
            },
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

router.post('/', async (req, res) => {
    try {
        console.log(req.session, req.params);
        let newBook = {
            user_id: req.session.user_id,
            library_id: req.body.library_id,
            book_id: req.body.book_id,
            checked_out: false,
        }
        const libraryBookData = await LibraryBook.create(newBook);

        res.status(200).json(libraryBookData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const librarybookData = await LibraryBook.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!librarybookData) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        res.status(200).json({ message: `Book with ID: ${req.params.id} deleted.` })
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;