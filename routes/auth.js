const jwt = require('jsonwebtoken')
config = require('../config');
usermodel = require('../models/user');

const auth = async(req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, config.secret)
        usermodel.findUserById(data.id,(err,user) => { //return wrong 
            if(err) throw new Error();  
            if (!user) {
                throw new Error()
            }
            req.user = user
            req.token = token
            next()
        });
        
    } catch (error) {
        console.log("not authorized")
        res.json({success:false, message: 'not authorized by guard', error: error.toString()});
    }
}

module.exports = auth;

