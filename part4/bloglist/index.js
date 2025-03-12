const config = require('./utils/config')
const app = require('./app')
const blogRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')

app.use(middleware.requestLogger)

app.use( '/api/blogs' , blogRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

app.listen( config.PORT , () => {
    console.log(`app is listening on port http://localhost:${config.PORT}/`)
} )