const Router = require('express').Router()
const bcrypt = require('bcrypt') 
const { User } = require('../model/user')
const logger = require('../utils/logger')

Router.post('/' , async (request , response ) => {
    const { username , name , password } = request.body
    console.log('👁‍🗨👁‍🗨')
    console.log(request.body)

    const saltRounds = 10 
    const passwordHash = await bcrypt.hash(password , saltRounds);
    
    const user =  new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

Router.get( '/' , async ( req , res , next) => {
    const users = await User.find({})
    res.json(users)
} )

module.exports = Router