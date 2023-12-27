const { DataTypes } = require('sequelize');

const dataItemModel = (sequelize) => {
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

  return DataItem;
};




module.exports = dataItemModel;
