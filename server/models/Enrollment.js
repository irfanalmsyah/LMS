const sequelize = require('../configs/database');

const Enrollment = sequelize.define('enrollment')

module.exports = Enrollment;