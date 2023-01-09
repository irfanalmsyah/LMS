const Sequelize = require('sequelize');
const sequelize = require('../configs/database');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "name"',
        },
      },
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'Please provide a value for "username"',
            },
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please provide a value for "password"',
            },
        },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Please provide a valid email address',
        },
        notEmpty: {
          msg: 'Please provide a value for "email"',
        },
      },
    },
    regnum: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'Please provide a value for "regnum"',
            },
        }
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
    },
    birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please provide a value for "birthdate"',
            },
        },
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isUrl: {
                msg: 'Please provide a valid url for "avatar"',
            },
            notEmpty: {
                msg: 'Please provide a value for "avatar"',
            },
        },
    },
    role: {
      type: Sequelize.ENUM('admin', 'lecturer', 'student'),
      allowNull: false,
    }
  },
);

module.exports = User;