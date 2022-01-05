const { json } = require('body-parser');
const Expense = require('../models/expenses');

const addexpense = (req, res) => {
    const { expenseamount, description, category } = req.body;
    req.user.createExpense({ expenseamount, description, category }).then(expense => {
        return res.status(201).json({ expense, success: true });
    }).catch(err => {
        return res.status(403).json({ success: false, error: err })
    })
}

const getexpenses = (req, res) => {

    req.user.getExpenses().then(expenses => {
        return res.status(200).json({ expenses, success: true })
    })
        .catch(err => {
            return res.status(402).json({ error: err, success: false })
        })
}

const leaderboards = (req,res)=>{
    Expense.findAll().then((members) => {
        res.json(members)
    }).catch((err) => {
       console.log(error);
    });
}

module.exports = {
    getexpenses,
    addexpense,
    leaderboards
}