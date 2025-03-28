const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        minLength : [3 , 'Too short, please provide a username with minimum of 3 characters']
    } ,
    name : String ,
    passwordHash : {
        type : String,
        required : true,
        minLength : [3 , 'Too short, please provide a password with minimum of 3 characters']
    } ,
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