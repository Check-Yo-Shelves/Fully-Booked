const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model { }

// Do we need title, author, genre, and artwork? Can these be pulled directly from the API as needed and only keep the isbn to use to create the API pull?
Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
            },
        },
        // title: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        // author: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        // artwork: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         isUrl: true,
        //     },
        // },
        // genre: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'book',
    }
);

module.exports = Book;