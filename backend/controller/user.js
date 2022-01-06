
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const password = require('../models/Userpasswords')
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const sendgrid = require('@sendgrid/mail');
const UserPasswords = require('../models/Userpasswords');
const APIKEY = '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'

const signup = (req, res) => {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                console.log('Unable to create new user')
                res.json({ message: 'Unable to create new user' })
            }
            User.create({ name, email, password: hash }).then(() => {
                res.status(201).json({ message: 'Successfuly create new user' })
            }).catch(err => {
                res.status(403).json(err);
            })

        });
    });
}

function generateAccessToken(id) {
    return jwt.sign(id, process.env.TOKEN_SECRET);
}

const login = (req, res) => {
    const { email, password } = req.body;
    console.log(password);
    User.findAll({ where: { email } }).then(user => {
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, response) {
                if (err) {
                    console.log(err)
                    return res.json({ success: false, message: 'Something went wrong' })
                }
                if (response) {
                    console.log(JSON.stringify(user))
                    const jwttoken = generateAccessToken(user[0].id);
                    res.json({ token: jwttoken, success: true, message: 'Successfully Logged In' })
                } else {

                    return res.status(401).json({ success: false, message: 'passwords do not match' });
                }
            });
        } else {
            return res.status(404).json({ success: false, message: 'passwords do not match' })
        }
    })
}

const forgotpassword = (req, res) => {

    const UUID = uuid();

    const { email } = req.body
    sendgrid.setApiKey(APIKEY);
    UserPasswords.create({
        uuid: UUID,
        email: email,
        isactive: true
    })
    const message = {
        to: email,
        from: "sadikshaik139@gmail.com",
        subject: "reset Your password",
        text: 'dummy',
        html: '<a href=http://localhost3000/resetpassword/`${UUID}`> reset your password here</a>'
    }
    res.send(`<h3>reset link is sent to your email</h3>`)
}

const resetpasswrodform = (req, res) => {

    res.send(`<form action="/resetpasswrodform" method="POST">
    <label for="password" >enter password</label>
    <input id ="passwrod">
    <label for="reenterpassword" >reenter password</label>
    <input id="reenterpassword">
    <button>Reset</button>
    </form>`)
}

const resetpasswrod = async (req, res) => {
    const { enterpasswrod, reenterpassword } = req.body
    if (enterpasswrod == reenterpassword) {

        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(salt, reenterpassword)
        await User.set({ password: password });
        res.status(200).send('<h1>Success</h1>');
    }
    else {
        res.status(400).send(`<h1>Entered password are wrong</h1>`)
    }
}
module.exports = {
    signup,
    login,
    forgotpassword,
    resetpasswrodform,
    resetpasswrod
}

