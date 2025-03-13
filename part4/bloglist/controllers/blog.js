const Router = require('express').Router()
const { Blog } = require('../model/blog')
const logger = require('../utils/logger')

Router.get( '/' , async ( req , res , next) => {
    const blogs = await Blog.find({})
    res.json(blogs)
} )

Router.post( '/' , async ( req , res , next) => {
    try {
        const blog = new Blog(req.body)

        const newBlog = await blog.save()
        
        return res.status(201).json(newBlog)

    } catch(err) {
        console.log(err)
        res.status(500).json({
            error : 'Internal server error'
        })
    }
} )

Router.use(( req , res ) => {
    res.status(404).send('Invalid Blog Related Request')
})

Router.use((err , req , res , next ) => {
    if(err.code === 11000){
        Object.entries(err.keyValue).forEach(([key , value]) => {
            let message = `duplicate ${key}${value.length <= 15 ? `(${value})` : ''} found`
            res.status(400).json({error: message})
        })
        return;
    }
    next(err)
})


module.exports = Router