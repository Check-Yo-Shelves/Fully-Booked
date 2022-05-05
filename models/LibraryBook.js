const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class LibraryBook extends Model { }

LibraryBook.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        library_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'library',
                key: 'id',
            },
        },
        book_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'book',
                key: 'id',
            },
        },
        // Can I have a third column for a checked out book? Or do I not need this? Like, which user_id checked it out (can be null)
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product_tag',
    }
);

module.exports = LibraryBook;