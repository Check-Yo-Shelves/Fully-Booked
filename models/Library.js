const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Library extends Model { }

Library.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zip_code: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // Does a string need to be numeric? Per the docs, this would only allow numbers. However it would be a truthy number in a == scenario.
                isNumeric: true,
                len: [5, 5],
            },
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lat: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lon: {
            type: DataTypes.STRING,
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
        modelName: 'library',
    }
)

module.exports = Library;