const User = require('./User');
const Library = require('./Library');
const LibraryBook = require('./LibraryBook');
const Book = require('./Book');

User.hasMany(Library, {
    foreignKey: `user_id`,
    onDelete: `SET NULL`,
});

Library.belongsTo(User, {
    foreignKey: `user_id`,
});

User.hasMany(LibraryBook, {
    foreignKey: `user_id`,
    onDelete: `SET NULL`,
});

LibraryBook.belongsTo(User, {
    foreignKey: `user_id`,
});

Book.belongsToMany(Library, {
    through: {
        model: LibraryBook,
        unique: false
    },
    as: `libraries`
});

Library.belongsToMany(Book, {
    through: {
        model: LibraryBook,
        unique: false
    },
    as: `books`
});

module.exports = { User, Library, Book, LibraryBook };
