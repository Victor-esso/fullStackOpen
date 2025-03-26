require('express-async-errors')
const express =  require('express')
const connectDB = require('./utils/db')

const cors = require('cors')
const app = express()

const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())


app.use(middleware.requestLogger)

connectDB() // Connect once before using models

app.use( '/api/blogs' , blogRouter)
app.use( '/api/users' , userRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app