// Add Dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// include bcrypt for password encryption
const bcrypt = require('bcrypt');

// user extends sequelize model
class User extends Model {
    // use bcrypt to validate pw on login
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
        autoIncrement: true
        },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          }
        },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
            }
        },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
            }
        }
  },
  {
    // add hooks for pw hashing
    hooks: {
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
          }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

//export user model
module.exports = User;