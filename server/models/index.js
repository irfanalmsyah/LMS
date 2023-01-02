const User = require('./User');
const Course = require('./Course');
const CourseClass = require('./CourseClass');
const CourseChild = require('./CourseChild');
const Enrollment = require('./Enrollment');
const Teaching = require('./Teaching');

CourseClass.hasMany(CourseChild);
CourseChild.belongsTo(CourseClass);

Course.hasMany(CourseClass);
CourseClass.belongsTo(Course);

User.belongsToMany(CourseClass, { through: Enrollment });
CourseClass.belongsToMany(User, { through: Enrollment });

User.belongsToMany(CourseClass, { through: Teaching });
CourseClass.belongsToMany(User, { through: Teaching });

const sequelize = require('../configs/database');
sequelize.sync();

module.exports = {
    User,
    Course,
    CourseChild,
    CourseClass,
    Enrollment,
    Teaching,
};