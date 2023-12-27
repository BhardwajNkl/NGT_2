const { DataTypes } = require('sequelize');

const attributeValueModel = (sequelize) => {
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

  return AttributeValue;
};




module.exports = attributeValueModel;
