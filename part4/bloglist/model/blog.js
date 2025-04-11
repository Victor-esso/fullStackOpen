const mongoose = require( 'mongoose' )

const blogSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true
    },
    author: {
        type : String,
        required : true,
    },
    url: {
        type : String,
        required : true,
        unique : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document , returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports.Blog = mongoose.model('Blog' , userSchema)