const Router = require('express').Router()
const { Blog } = require('../model/blog')
const { User } = require('../model/user')
const logger = require('../utils/logger')

Router.get( '/' , async ( req , res , next) => {
    const blogs = await Blog.find({}).populate('user',{
        username : 1 ,
        name : 1
    })
    res.json(blogs)
} )

Router.post( '/' , async ( req , res , next) => {
    const body = req.body

    const user = await User.findById(body.userId)

    const blog = new Blog({
        title : body.title,
        author : body.author,
        url : body.url,
        likes : body.likes,
        user : user.id
    })

    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
    res.status(201).json(newBlog)
} )

Router.get('/:id' , async ( req , res , next ) => {
    const blog = await Blog.findById(req.params.id)
    res.json(blog)
} )

Router.delete('/:id' , async ( req , res , next ) => {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
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