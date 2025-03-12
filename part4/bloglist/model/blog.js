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