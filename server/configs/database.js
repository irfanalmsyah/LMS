const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

let sequelize;

switch (process.env.NODE_ENV) {
    case 'development':
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'database.sqlite'
        });
        break;
    case 'production':
        sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD, {
                host: process.env.DB_HOST,
                dialect: 'postgres',
                logging: false
            }
        );
        break;
    default:
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'database.sqlite'
        });
        break;
}

module.exports = sequelize;

