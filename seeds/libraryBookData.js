const { LibraryBook } = require(`../models`);

const libraryBookData = [
    {
        library_id: 1,
        book_id: 1,
        checked_out: true,
        borrower_id: 1,
    },
    {
        library_id: 1,
        book_id: 3,
        checked_out: false,
        borrower_id: null,
    },
    {
        library_id: 2,
        book_id: 1,
        checked_out: false,
        borrower_id: null,
    },
    {
        library_id: 2,
        book_id: 2,
        checked_out: true,
        borrower_id: 3,
    },
    {
        library_id: 3,
        book_id: 2,
        checked_out: true,
        borrower_id: 4,
    },
    {
        library_id: 3,
        book_id: 3,
        checked_out: true,
        borrower_id: 2,
    },
    {
        library_id: 3,
        book_id: 4,
        checked_out: true,
        borrower_id: 3,
    }
];

const seedLibraryBooks = () => LibraryBook.bulkCreate(libraryBookData);

module.exports = seedLibraryBooks;