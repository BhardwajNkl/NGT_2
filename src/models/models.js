const { DataTypes } = require('sequelize')
// const sequelize = require('../config/dbConfig');

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

const Attribute = sequelize.define(
    'attribute',
    {
        attributeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        attributeName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

const AttributeValue = sequelize.define(
    'attributeValue',
    {
        attributeValueId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        attributeValueName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

const DataItem = sequelize.define(
    'dataItem',
    {
        dataId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        col: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        row: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

User.hasMany(Project);
Project.belongsTo(User);
Project.hasMany(Attribute);
Attribute.belongsTo(Project);
Attribute.hasMany(AttributeValue);
AttributeValue.belongsTo(Attribute);
Project.hasMany(DataItem);
DataItem.belongsTo(Project);

module.exports = { User, Project, Attribute, AttributeValue, DataItem };