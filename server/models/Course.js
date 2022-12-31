const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const Course = sequelize.define('course', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please provide a value for "name"',
            },
        },
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'Please provide a value for "code"',
            },
            
        },
    },
});

module.exports = Course;