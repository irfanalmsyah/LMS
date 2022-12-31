const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const CourseChild = sequelize.define('coursechild', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please provide a value for "name"',
            },
        },
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    }
});

module.exports = CourseChild;