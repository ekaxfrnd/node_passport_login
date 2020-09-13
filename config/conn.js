const {
    Sequelize
} = require('sequelize')

require('dotenv').config()

const {
    DB_NAME,
    DB_USER,
    DB_PASS,
    SERVER_HOST,
    DB_DIALECT
} = process.env

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: SERVER_HOST,
    dialect: DB_DIALECT,
    dialectOptions: {
        timezone: 'Etc/GMT0'
    }
})