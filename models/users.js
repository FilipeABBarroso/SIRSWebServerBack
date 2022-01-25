const { DataTypes } = require('sequelize');
const db = require('../db');

const Users = db.define('Users', {
    uid: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    uuid: {
        type: DataTypes.UUID,
        allowNull: false,
    },
});

module.exports = Users;