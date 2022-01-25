const { DataTypes } = require('sequelize');
const db = require('../db');

const Files = db.define('Files', {
    id: {
        type: DataTypes.DECIMAL,
        autoIncrement: true,
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
});

Files.User = Files.belongsTo(Users, {
    foreignKey: 'uid',
    allowNull: false,
    onUpdate: 'CASCADE',
});

module.exports = Files;