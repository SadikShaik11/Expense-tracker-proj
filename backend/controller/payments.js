const payment = require('../models/premium')
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
module.exports.payment_verification =  (req, res) => {

    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'Wok5mJv2F0pa5HKLeXZfUr9r')
        .update(body.toString(tsvg7waS8WLe34bzeiKM63L7))
        .digest('hex');
    console.log("sig received ", req.body.response.razorpay_signature);
    console.log("sig generated ", expectedSignature);
    var response = { "signatureIsValid": "false" }
    if (expectedSignature === req.body.response.razorpay_signature)
        response = { "signatureIsValid": "true" }
    res.send(response);
}

module.exports.CreateOrder =  (req, res, next) => {
    console.log("create order", req.body);
    var options = {
        amount: req.body.amount,
        currency: "INR",
        receipt: "rcp1"
    };
    instance.orders.create(options, function (err, order) {
        console.log(order);
        res.send({ order: order.id })
    });
}
module.exports.Save = (req,res,next)=>{
        const paymentId= req.body.razorpay_payment_id
         const OrderId=req.body.razorpay_order_id
          const Signature= req.body.razorpay_signature  
          const description =req.body.description;
         payment.create({
            transactionid:paymentId,
            orderid:OrderId,
            signature:Signature,
            description:description})
}
