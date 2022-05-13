const { LibraryBook } = require(`../models`);
const { createLibraryBook } = require(`../utils/helpers`);

const libraryBookData = [];
for (let i = 0; i < 100; i++) {
    libraryBookData.push(createLibraryBook());
}


const seedLibraryBooks = () => LibraryBook.bulkCreate(libraryBookData);

module.exports = seedLibraryBooks;