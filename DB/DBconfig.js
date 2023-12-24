const Sequlize = require('sequelize');
// Let's define a sequlize instance to connect to our database.
const sequelize = new Sequlize("ngt3","root","root",{
    dialect: 'mysql',
    host: 'localhost',
    port: '3306'
});

module.exports = sequelize;