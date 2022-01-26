const { DataTypes } = require('sequelize');
const Users = require('./users');
const db = require('../db');

const Files = db.define('Files', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isBlocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    fileHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
});

Files.uid = Files.belongsTo(Users, {
    foreignKey: 'uid',
    allowNull: false,
    onUpdate: 'CASCADE',
});

module.exports = Files;