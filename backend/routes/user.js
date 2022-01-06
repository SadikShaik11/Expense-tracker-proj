const express = require('express');

const userController = require('../controller/user');
const expenseController = require('../controller/expense')
const Payments = require('../controller/payments')
const authenticatemiddleware = require('../middleware/author');
const Expense = require('../models/expenses');

const router = express.Router();


router.post('/signup', userController.signup);

router.post('/login', userController.login)

router.post('/addexpense', authenticatemiddleware.authenticate, expenseController.addexpense)
router.post("/api/payment/verify", Payments.payment_verification);
router.get('/create/orderId', Payments.CreateOrder);
router.get('payment/success/', Payments.Save);
router.get('/IsPremiumMember', Payments.IsPremiumMember);
router.get('/leaderboards', expenseController.leaderboards);
router.post('/password/forgotpasswrod', userController.forgotpassword)
router.get('/password/resetpassword',userController.resetpasswrodform);
router.post('/password/resetpassword',userController.resetpasswrod);
router.get('/download', expenseController.downloadExpenses)
module.exports = router;