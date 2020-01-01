const jwt = require('jsonwebtoken')
config = require('../config');
usermodel = require('../models/user');

const auth = async(req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        if(!token) throw new Error("no token given");
        console.log(token)
        const data = jwt.verify(token, config.secret)
        console.log(data);
        usermodel.findUserById(data.id,(err,user) => { //return wrong 
            if(err) throw new Error("Error with sql request");  
            if (!user) {
                throw new Error("User not found !")
            }
            req.user = user
            req.token = token
            next()
        });
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message: 'not authorized by guard', error: error.toString()});
    }
}

module.exports = auth;

