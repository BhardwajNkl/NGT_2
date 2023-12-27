const { DataTypes } = require('sequelize');
const User = require('./user')

const projectModel = (sequelize) => {
  const Project = sequelize.define(
    'project',
    {
        projectId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        projectName: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        columnCount: {
            type: DataTypes.INTEGER,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

  return Project;
};



module.exports = projectModel;
