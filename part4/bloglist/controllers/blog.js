const Router = require('express').Router()

Router.get( '/' , ( request , response ) => {
    response.json(['Get Blogs Router'])
} )

Router.post( '/' , ( request , response ) => {
    response.json(['Save Blogs Router'])
} )

Router.use(( req , res ) => {
    res.status(404).send('Invalid Blog Related Request')
})



module.exports = Router