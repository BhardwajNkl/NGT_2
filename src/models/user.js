const { DataTypes } = require('sequelize');
const Project = require('./project')

const userModel = (sequelize) => {
  const User = sequelize.define(
    'user',
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);
  
  return User;
};

module.exports = userModel;
