const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username : String ,
    name : String ,
    passwordHash : String ,
    blogs : [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'Blog'
        }
    ]
})

userSchema.set('toJSON' , {
    transform : ( document , returnedObject ) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

        //delete passwordHash  Should not be revealed
        delete returnedObject.passwordHash
    }
})

module.exports.User = mongoose.model('User' , userSchema)