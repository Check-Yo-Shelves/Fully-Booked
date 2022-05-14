const router = require('express').Router();
const { Book, Library, LibraryBook } = require('../../models');

router.post('/', (req, res) => {
    Book.create(req.body)
        .then(book => res.json({ msg: 'Book successfully added' }))
        .catch(err => res.status(400).json({ error: 'Can not add this book' }));
});

router.get('/', (req, res) => {
    Book.findAll({ include: [{ model: Library, through: LibraryBook, as: 'libraries' }] })
        .then(books => res.json(books))
        .catch(err => res.status(404).json({ nobooksfound: 'Book not found' }));
});

router.get('/:id', (req, res) => {
    Book.findByPk(req.params.id, { include: [{ model: Library, through: LibraryBook, as: 'libraries' }] })
        .then(book => res.json(book))
        .catch(err => res.status(404).json({ nobookfound: 'Book not found' }));
});

router.delete('/:id', async (req, res) => {
    try {
        const bookData = await Book.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!bookData) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        res.status(200).json({ message: `Book with ID: ${req.params.id} deleted.` })
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;