require('dotenv').config()
const jwt = require('jsonwebtoken')


const validateUserToken = token => {
    if(!token){
        return false
    }
    const decodedToken = jwt.verify( token , process.env.SECRET)
    return decodedToken.id ? decodedToken : false;
}


module.exports = {
    validateUserToken
}