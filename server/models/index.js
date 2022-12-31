const bcrypt = require('bcryptjs');
const User = require('./User');
const Course = require('./Course');
const CourseClass = require('./CourseClass');
const CourseChild = require('./CourseChild');
const Enrollment = require('./Enrollment');

CourseClass.hasMany(CourseChild);
CourseChild.belongsTo(CourseClass);

Course.hasMany(CourseClass);
CourseClass.belongsTo(Course);

User.belongsToMany(CourseClass, { through: Enrollment });
CourseClass.belongsToMany(User, { through: Enrollment });

const sequelize = require('../configs/database');
sequelize.sync();

/* (async () => {
    defaultadmin = await User.findOne({ where: { id : 1 } })
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
    if (!defaultadmin) {
        await User.create({
            id : 1,
            name: 'default admin',
            username: process.env.ADMIN_USERNAME,
            password: hashedPassword,
            email: process.env.ADMIN_EMAIL,
            role: 'admin',
        })
    }
})(); */

module.exports = {
    User,
    Course,
    CourseChild,
    CourseClass,
    Enrollment,
};