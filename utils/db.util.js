const { Sequelize } = require('sequelize');

// Establish connection to db
const db = new Sequelize({
    dialect: 'postgres',
    storage: 'localhost',
    username: 'postgres',
    password: 'melash18',
    port: 5432,
    database: 'tasks',
    logging: false
})

module.exports = { db };