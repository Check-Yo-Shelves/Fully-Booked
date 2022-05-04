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