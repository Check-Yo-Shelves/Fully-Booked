const { Book } = require(`../models`);

const bookData = [
    {
        isbn: 0140328726,
        on_loan: true,
        user_id: 1,
    },
    {
        isbn: 0141369302,
        on_loan: false,
        user_id: "",
    },
    {
        isbn: 0563380780,
        on_loan: false,
        user_id: "",
    },
    {
        isbn: 0721409431,
        on_loan: true,
        user_id: 3,
    }
];

const seedBooks = () => Book.bulkCreate(bookData);

module.exports = seedBooks;