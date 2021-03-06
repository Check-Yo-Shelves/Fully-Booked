const { Book } = require(`../models`);

const bookData = [
    {
        isbn: "0140328726",
    },
    {
        isbn: "0141369302",
    },
    {
        isbn: "0563380780",
    },
    {
        isbn: "0721409431",
    },
    {
        isbn: "9780544003415",
    },
    {
        isbn: "1408855895",
    },
    {
        isbn: "9781408855898",
    },
    {
        isbn: "0451166892",
    },
    {
        isbn: "9780439139601",
    },
    {
        isbn: "0394800133",
    },
    {
        isbn: "9780394800011",
    },
    {
        isbn: "1727118871",
    },
    {
        isbn: "9780553288209",
    },
    {
        isbn: "9780743477550",
    },
    {
        isbn: "9780062390622",
    },
    {
        isbn: "9780261102002",
    },
    {
        isbn: "0060598247",
    },
    {
        isbn: "6257120896",
    },
    {
        isbn: "9780451526342",
    },
    {
        isbn: "9798630242716",
    },
    {
        isbn: "9798745274824",
    },
    {
        isbn: "0743477103",
    },
    {
        isbn: "9780743477567",
    },
];

const seedBooks = () => Book.bulkCreate(bookData);

module.exports = seedBooks;