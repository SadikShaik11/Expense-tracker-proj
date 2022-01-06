
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const UserPasswords = sequelize.define('passwords', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    UUID:{
      type:Sequelize.STRING
    },
    email: {
       type:  Sequelize.STRING,
       allowNull: false,
       unique: true
    },
    isactive:Boolean
})

module.exports = UserPasswords;
