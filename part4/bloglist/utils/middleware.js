const logger = require('./logger')

const errorHandler = ( err , req , res , next ) => {

    switch (err.name) {

        case 'MongooseError':
            return res.status(400).json({ error : err.message })
        
        case 'MongoServerError':
            return res.status(400).json({ error : err })
        
        case 'CastError':
            return res.status(404).send({ error: 'malformatted id' })
        
        case 'ValidationError':
            return res.status(400).json({ error : err.errors })
        
        default:
            next(err)
        break
    }
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