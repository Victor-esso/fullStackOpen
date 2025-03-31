require('dotenv').config()
const Router = require('express').Router()
const jwt = require('jsonwebtoken')
const { Blog } = require('../model/blog')
const { User } = require('../model/user')
const logger = require('../utils/logger')
const middleware = require('../utils/middleware')
const { validateUserToken } = require('../helpers/app')



Router.use(middleware.bearerTokenExtractor)



Router.get( '/' , middleware.extractUser , async ( req , res , next) => {
    let blogs = await Blog.find({}).populate('user',{
        username : 1 ,
        name : 1
    })

    if (req?.user) {
        blogs = blogs.map(blog => {
            console.log(req?.user)
            return {...blog.toJSON() , owner : (blog?.user?.id === req.user._id.toString() )} 
        });
    }
    res.json(blogs)
} )

Router.post( '/' , async ( req , res , next) => {
    const body = req.body
    // Verify token

    const decodedToken = validateUserToken(req.token)
    if(!decodedToken.id){
        return res.status(401).json({ error : 'Token Invalid' })
    }

    const user = await User.findById(decodedToken.id)

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
    res.status(201).json({...newBlog.toJSON(), owner : true})
} )

Router.get('/:id' , async ( req , res , next ) => {
    const blog = await Blog.findById(req.params.id)
    res.json(blog)
} )

Router.delete('/:id' ,middleware.extractUser, async ( req , res , next ) => {
    // verify token

    if(!req.user){
        res.status(401).json({ error : 'Invalid Token'})
    }

    // get blog details
    const blogDetails = await Blog.findById(req.params.id).populate('user')

    if( req.user._id.toString() === blogDetails?.user._id.toString() ) {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
        res.status(204).end()
        return;
    }

    res.status(401).json({ error : "Unauthorized action"})

} )

// Like or Unlike a Post
Router.put("/:id/like",middleware.extractUser, async (req, res) => {


        if(!req.token){
            return res.status(401).json({error : 'Unauthorized Access'})
        }
        
        const blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ error: "Blog not found" });

        // Ensure likes is at least 0 before incrementing
        blog.likes = (blog.likes || 0) + 1;

        const updatedBlog = await blog.save();
        res.json({ likes: updatedBlog.likes });

});

Router.put("/:id/unlike",middleware.extractUser, async (req, res) => {


        if(!req.token){
            return res.status(401).json({error : 'Unauthorized Access'})
        }
        
        const blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ error: "Blog not found" });

        // Ensure likes doesn't go below 0
        blog.likes = Math.max((blog.likes || 0) - 1, 0);

        const updatedBlog = await blog.save();
        res.json({ likes: updatedBlog.likes });

});








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