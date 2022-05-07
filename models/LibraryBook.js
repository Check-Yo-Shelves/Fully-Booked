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
        checked_out: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'librarybook',
    }
);

module.exports = LibraryBook;