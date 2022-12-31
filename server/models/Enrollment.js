const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const Enrollment = sequelize.define('enrollment', {
    date_enrolled: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please provide a value for "date_enrolled"',
            },
        },
    }
});

module.exports = Enrollment;