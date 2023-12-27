const { DataTypes } = require('sequelize');

const attributeModel = (sequelize) => {
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

  return Attribute;
};


module.exports = attributeModel;
