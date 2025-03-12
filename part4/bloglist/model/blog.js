const mongoose = require( 'mongoose' )
const config = require( '../utils/config' )
const logger = require( '../utils/logger' )

mongoose.set( 'strictQuery' , false )

async function  connectDB () {
    try {
        await mongoose.connect( config.MONGO_URL )
        logger.info('✅ Connected to MongoDB')
    } catch ( error ) {
        logger.error( `❗️❗️❗️ Error connecting to MongoDB: ${error.message}` )
        process.exit(1)
    }
}

connectDB()

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
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document , returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports.Blog =  mongoose.model('Blog' , blogSchema)