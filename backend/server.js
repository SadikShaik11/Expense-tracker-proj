const path = require('path');
const Razorpay =require('razorpay')
const express = require('express');
var cors = require('cors')
const sequelize = require('./util/database');
const User = require('./models/users');
const Expense = require('./models/expenses');
const Payments = require('./models/premium')

const bodyParser = require('body-parser')

const userRoutes = require('./routes/user')

const ex = express();

const dotenv = require('dotenv');

dotenv.config();
ex.use(cors());

ex.use(express.json());
ex.use('/user', userRoutes)
User.hasMany(Expense);
Expense.belongsTo(User);
Payments.belongsTo(User);

sequelize.sync()
    .then(() => {
        ex.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })
