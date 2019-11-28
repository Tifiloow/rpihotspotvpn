auth = require('./auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = "secretkey";
config = require('../config');
const express = require('express')
const router = express.Router()
usermodel = require('../models/user')

router.get('/', async(req, res) => {
    res.json({
        message: '/user portal'
    })
})

usermodel.createUsersTable(); //initiate the user table if not exists




router.post('/register', (req, res) => {
    usermodel.existUser((err, user) => { //verify if already user exists
        if (err) return res.json({
            success: false,
            message: 'Server error!'
        });
        if (false){//parseInt(user['count(*)']) > 0) {
            console.log(user['count(*)']);
            return res.json({
                success: false,
                message: 'A user already exists on this machine'
            });
        } else { //user dont exists
            const name = req.body.name;
            const email = req.body.email;
            const password = bcrypt.hashSync(req.body.password);

            usermodel.createUser([name, email, password], (err) => {
                try {
                    if (err) return res.json({
                        success: false,
                        message: 'Server error!'
                    });
                    usermodel.findUserByEmail(email, (err, user) => {
                        if (err) return res.json({
                            success: false,
                            message: 'Server error!'
                        });
                        const expiresIn = 24 * 60 * 60;
                        const accessToken = jwt.sign({
                            id: user.id
                        }, config.secret, {
                            expiresIn: expiresIn
                        });
                        res.json({
                            success: true,
                            "user": user,
                            "access_token": accessToken,
                            "expires_in": expiresIn
                        });
                    });
                } catch (error) {
                    console.log(error);
                    res.json({success: false, message:error.toString()})
                }
            });
        }
    });


});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    usermodel.findUserByEmail(email, (err, user) => {
        if (err) return res.json({
            success: false,
            message: 'Server error!'
        });
        if (!user) return res.json({
            success: false,
            message: 'user not found!'
        });
        const result = bcrypt.compareSync(password, user.password);
        if (!result) return res.json({
            success: false,
            message: 'password not valid!'
        });
        console.log(user);
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({
            id: user.id
        }, SECRET_KEY, {
            expiresIn: expiresIn
        });
        res.json({
            success: true,
            "user": user,
            "access_token": accessToken,
            "expires_in": expiresIn
        });
    });
});


router.get('/me', auth, (req, res) => {
    // View logged in user profile
    try {
        res.json({
            success: true,
            user: req.user
        });
    } catch (err) {
        res.json({
            success: false,
            message: err.toString()
        });
    }
})
module.exports = {
    router: router
};