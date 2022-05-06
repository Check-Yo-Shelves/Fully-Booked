const { Book } = require(`../models`);

const bookData = [
    {
        isbn: 0140328726,
    },
    {
        isbn: 0141369302,
    },
    {
        isbn: 0563380780,
    },
    {
        isbn: 0721409431,
    }
];

const seedBooks = () => Book.bulkCreate(bookData);

module.exports = seedBooks;