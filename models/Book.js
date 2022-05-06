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
            type: DataTypes.INTEGER,
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
        on_loan: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        // This is the reference to the user who has checked out the book (borrower)
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.on_loan = false;
                return newUserData;
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