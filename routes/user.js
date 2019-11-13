const express = require('express')
auth = require('./auth');
const router = express.Router()
User = require('../models/user')

router.get('/', async (req, res) => {
    res.json({message:'/user portal'})
})

router.post('/register', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.json({success: true, user, token})
    } catch (error) {
        res.json({success: false, error: error.toString()})
    }
})
router.post('/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.json({error:true, message:'Verify credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({success:true, user, token })
    } catch (error) {
        res.json({success: false, message:"not authorized"})
    }
})
router.get('/me', auth, async(req, res) => {
    // View logged in user profile
    res.json({success:true, user: req.user});
})


module.exports = router;