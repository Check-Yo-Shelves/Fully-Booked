const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { bookApi } = require('../utils/bookApi.js');

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
                len: [10, 13],
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        author: {
            type: DataTypes.STRING,
            // allowNull: false,
            // Split up the author names if more than one author exists.
            get() {
                const rawValue = this.getDataValue('author');
                return rawValue ? rawValue.split(',') : null;
            },
        },
        artwork: {
            type: DataTypes.STRING,
            // allowNull: false,
            validate: {
                isUrl: true,
            },
        },
        // description: {
        //     type: DataTypes.STRING,
        // },
        // genre: {
        //     type: DataTypes.STRING,
        //     get() {
        //         const rawValue = this.getDataValue('genre');
        //         return rawValue ? rawValue.split(',') : null;
        //     },
        // },
    },
    {
        hooks: {
            async beforeBulkCreate(newBookData) {
                // let bookInfo = await bookApi(newBookData);
                // newBookData[0].title = bookInfo.title;
                // newBookData[0].author = bookInfo.author;
                // newBookData[0].artwork = bookInfo.artwork;
                return await bookApi(newBookData);
            },
            async beforeCreate(newBookData) {
                // newBookData = await bookApi(newBookData);
                return await bookApi(newBookData);
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'book',
    }
);

module.exports = Book;