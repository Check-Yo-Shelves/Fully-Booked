const { LibraryBook } = require(`../models`);

const libraryBookData = [
    {
        library_id: 1,
        book_id: 1,
        checked_out: true,
        borrower: 1,
    },
    {
        library_id: 1,
        book_id: 3,
        checked_out: false,
    },
    {
        library_id: 2,
        book_id: 1,
        checked_out: false,
    },
    {
        library_id: 2,
        book_id: 2,
        checked_out: true,
        borrower: 3,
    },
    {
        library_id: 3,
        book_id: 2,
        checked_out: true,
        borrower: 4,
    },
    {
        library_id: 3,
        book_id: 3,
        checked_out: true,
        borrower: 2,
    },
    {
        library_id: 3,
        book_id: 4,
        checked_out: true,
        borrower: 3,
    }
];

const seedLibraryBooks = () => LibraryBook.bulkCreate(libraryBookData);

module.exports = seedLibraryBooks;