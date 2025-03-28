require('dotenv').config()
const jwt =  require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Router = require('express').Router()
const { User } = require('../model/user')

Router.post( '/' , async (req , res) => {
    const { username , password } = req.body
    const user =  await User.findOne({ username})

    const passwordCorrect = user ===  null ? false : await bcrypt.compare(password , user.passwordHash)

    if(!(user && passwordCorrect)) {
        return res.status(401).json({
            error : 'Invalid username or password'
        })
    }

    const userForToken = {
        username : user.username,
        id : user._id,
    }

    const token = jwt.sign(userForToken , process.env.SECRET)

    res.status(200).send( { token, username : user.username , name : user.name })
})


module.exports = Router