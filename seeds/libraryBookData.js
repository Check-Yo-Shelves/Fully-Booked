const { LibraryBook } = require(`../models`);

const libraryBookData = [
    {
        library_id: 1,
        book_id: 1,
    },
    {
        library_id: 1,
        book_id: 3,
    },
    {
        library_id: 2,
        book_id: 1,
    },
    {
        library_id: 2,
        book_id: 2,
    },
    {
        library_id: 3,
        book_id: 2,
    },
    {
        library_id: 3,
        book_id: 3,
    },
    {
        library_id: 3,
        book_id: 4,
    }
];

const seedLibrary = () => LibraryBook.bulkCreate(libraryBookData);

module.exports = seedLibrary;