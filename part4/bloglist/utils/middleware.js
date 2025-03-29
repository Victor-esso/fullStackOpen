const logger = require('./logger')
const { User } = require('../model/user')
const { validateUserToken } = require('../helpers/app')

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
        
        case 'JsonWebTokenError':
            return res.status(401).json({ error : 'Invalid Token' })
        
        case 'TokenExpiredError':
            return res.status(401).json({ error : 'token expired' })
        
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

const bearerTokenExtractor = ( req , res , next ) => {
    const authorization = req.get('authorization')
    req.token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : null;
    next() 
}

const extractUser = async ( req , res , next ) => {

    const decodedToken = validateUserToken(req.token)
    const userDetails = decodedToken?.id ? await User.findById(decodedToken.id) : false
    req.user = userDetails 
    next()
    
}


module.exports = {
    errorHandler,
    unknownEndPoint,
    requestLogger,
    bearerTokenExtractor,
    extractUser
}