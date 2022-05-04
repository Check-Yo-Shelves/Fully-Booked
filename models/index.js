const User = require('./User');
const Library = require('./User');
const LibraryBook = require('./User');
const Book = require('./User');

User.hasMany(Library, {
    foreignKey: `user_id`,
    onDelete: `SET NULL`,
});

Library.belongsTo(User, {
    foreignKey: `user_id`,
});

User.hasMany(Book, {
    foreignKey: `user_id`,
    onDelete: `SET NULL`,
});

Book.belongsTo(User, {
    foreignKey: `user_id`,
});

Book.belongsToMany(Library, {
    through: {
        model: LibraryBook,
        unique: false
    },
    as: `books_library`
});

Library.belongsToMany(Book, {
    through: {
        model: LibraryBook,
        unique: false
    },
    as: `library_books`
});

module.exports = { User, Library, Book, LibraryBook };
