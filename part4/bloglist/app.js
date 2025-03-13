const express =  require('express')
const cors = require('cors')
const app = express()

const blogRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.use( '/api/blogs' , blogRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app