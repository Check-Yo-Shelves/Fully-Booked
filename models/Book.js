const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { bookApi, bulkApi } = require('../utils/bookApi.js');

class Book extends Model { }

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
            type: DataTypes.STRING(),
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
        description: {
            type: DataTypes.STRING(10000),
        },
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
                return await bulkApi(newBookData);
            },
            async beforeCreate(newBookData) {
                console.log("WE HIT BEFORE CREATE:", '\n', newBookData);
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