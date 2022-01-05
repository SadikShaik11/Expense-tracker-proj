const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Transactions = sequelize.define('expenses', {
    email:{
      type:Sequelize.STRING
      ,primaryKey: true
    },
    transactionid: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    signature: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    orderid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    }
})

module.exports = Transactions;
