const jwt = require('jsonwebtoken')
config = require('../config');
User = require('../models/user')
const auth = async(req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token);
        const data = jwt.verify(token, config.secret)
        console.log(data);
        const user = await User.findOne({ _id: data._id}).exec()
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        console.log("not authorized")
        res.json({success:false, message: 'not authorized', error: error.toString()})
    }

}

module.exports = auth

//problème pour trouver avec id