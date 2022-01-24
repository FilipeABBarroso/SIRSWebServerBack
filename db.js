const Sequelize = require('sequelize');
const dbConfig = require('./db.config');


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        dialect: dbConfig.dialect,
        host: dbConfig.HOST,
        define: {
            charset: 'utf8',
        }
    }
);

module.exports = sequelize;