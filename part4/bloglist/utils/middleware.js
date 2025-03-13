const logger = require('./logger')

const errorHandler = ( err , req , res , next ) => {
    logger.info(err.errorResponse)
    
    logger.error("Error:", err.message);
    next( err )
}

const unknownEndPoint = ( req , res , ) => {
    logger.error(req.url)
    res.status(404).send( { error : 'unknown Endpoint'} )
}

const requestLogger = ( req , res , next ) => {
    logger.info(req.url , req.method)
    next()
}


module.exports = {
    errorHandler,
    unknownEndPoint,
    requestLogger
}