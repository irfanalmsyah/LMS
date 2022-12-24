const User = require('./User');
const sequelize = require('../configs/database');

sequelize.sync();

module.exports = {
    User,
};
  