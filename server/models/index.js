const User = require('./User');
const bcrypt = require('bcryptjs');

const sequelize = require('../configs/database');
sequelize.sync();

(async () => {
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
})();

module.exports = {
    User,
};
