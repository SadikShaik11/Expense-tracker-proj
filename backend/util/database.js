const Sequelize = require('sequelize')

const sequelize = new Sequelize("users", "root", "sadik121", {
    dialect: 'mysql',
    host: "localhost"
})
module.exports = sequelize;


