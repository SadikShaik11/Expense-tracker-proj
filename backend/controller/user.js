
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const sendgrid =require('@sendgrid/mail');
const APIKEY= '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'

 const signup = (req, res)=>{
    const { name, email, password } = req.body;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            if(err){
                console.log('Unable to create new user')
                res.json({message: 'Unable to create new user'})
            }
            User.create({ name, email, password: hash }).then(() => {
                res.status(201).json({message: 'Successfuly create new user'})
            }).catch(err => {
                res.status(403).json(err);
            })

        });
    });
}

function generateAccessToken(id) {
    return jwt.sign(id ,process.env.TOKEN_SECRET);
}

const login = (req, res) => {
    const { email, password } = req.body;
    console.log(password);
    User.findAll({ where : { email }}).then(user => {
        if(user.length > 0){
            bcrypt.compare(password, user[0].password, function(err, response) {
                if (err){
                console.log(err)
                return res.json({success: false, message: 'Something went wrong'})
                }
                if (response){
                    console.log(JSON.stringify(user))
                    const jwttoken = generateAccessToken(user[0].id);
                    res.json({token: jwttoken, success: true, message: 'Successfully Logged In'})
                } else {
               
                return res.status(401).json({success: false, message: 'passwords do not match'});
                }
            });
        } else {
            return res.status(404).json({success: false, message: 'passwords do not match'})
        }
    })
}

const forgotpassword = (req,res)=>{
    const{email}=req.body
    sendgrid.setApiKey(APIKEY);

    const message = {
        to:"vec.174n1a0565c@gmail.com",
        from:"sadikshaik139@gmail.com",
        subject:"Your password",
        text: 'dummy',
        html:`<h1>Hello<h1>`
    }

}

module.exports = {
    signup,
     login,
    forgotpassword
}

