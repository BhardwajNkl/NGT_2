const Sequelize = require("sequelize");
const dbConfig = require("../config/dbConfig");
const userModel = require("./user");
const projectModel = require("./project");
const attributeModel = require('./attribute');
const attributeValueModel = require('./attributeValue');
const dataItemModel = require('./dataItem')

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = userModel(sequelize);
db.project = projectModel(sequelize);
db.attribute = attributeModel(sequelize);
db.attributeValue = attributeValueModel(sequelize);
db.dataItem = dataItemModel(sequelize);

db.user.hasMany(db.project);
db.project.belongsTo(db.user);

db.project.hasMany(db.attribute);
db.attribute.belongsTo(db.project);

db.attribute.hasMany(db.attributeValue);
db.attributeValue.belongsTo(db.attribute);

db.project.hasMany(db.dataItem);
db.dataItem.belongsTo(db.project);

module.exports = db;
