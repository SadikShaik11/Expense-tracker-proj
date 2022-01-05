const express = require('express');

const userController = require('../controller/user');
const expenseController = require('../controller/expense')
const Payments = require('../controller/payments')
const authenticatemiddleware = require('../middleware/author');

const router = express.Router();


router.post('/signup', userController.signup);

router.post('/login', userController.login)

router.post('/addexpense', authenticatemiddleware.authenticate, expenseController.addexpense)
router.post("/api/payment/verify", Payments.payment_verification);
router.get('/create/orderId', Payments.CreateOrder);
router.get('payment/success/', Payments.Save);
module.exports = router;