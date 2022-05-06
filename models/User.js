const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [5, 5],
      },
    },
    // Placeholder for storing image urls for profile picture.
    // image_url: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   validate: {
    //     isUrl: true,
    //   }
    // },
  },
  {
    hooks: {
      async beforeBulkCreate(newUserData) {
        for (let i = 0; i < newUserData.length; i++) {
          newUserData[i].password = await bcrypt.hash(newUserData[i].password, 10);
        }
        return newUserData;
      },
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
