const router = require('express').Router();
const { Book } = require('../../models');

router.post('/', (req, res) => {
    Book.create(req.body)
      .then(book => res.json({ msg: 'Book successfully added' }))
      .catch(err => res.status(400).json({ error: 'Can not add this book' }));
  });

//   router.delete('/:id', (req, res) => {
//     Book.destroy(req.params.id, req.body)
//       .then(book => res.json({ mgs: 'This book has been deleted' }))
//       .catch(err => res.status(404).json({ error: 'Book not found' }));
//   });


router.delete('/:id', async (req, res) => {
    try {
      const Book = await book.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!book) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }
      res.status(200).json({ message: `Book with ID: ${req.params.id} deleted.`})
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;