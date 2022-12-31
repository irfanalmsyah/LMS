const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const CourseClass = sequelize.define('courseclass', {
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please provide a value for "code"',
            },
        },
    },
});

module.exports = CourseClass;
