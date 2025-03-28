const Router = require('express').Router()
const bcrypt = require('bcrypt') 
const { User } = require('../model/user')
const logger = require('../utils/logger')

Router.post('/' , async (request , response ) => {
    const { username , name , password } = request.body

    if(password && password.length <= 3){
        return response.status(400).json({ error : "too short , please provide a password with a minimum of 3 characters"})
    }
    

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
    const users = await User.find({}).populate('blogs',
        {
            title : 1,
            author : 1,
            likes : 1,
            url : 1
        }
    )
    res.json(users)
} )

Router.get('/:id' , async (req , res ) => {
  const user = await User.findById(req.params.id).populate('blogs' , { user : 0})
  res.json(user) 
})

module.exports = Router