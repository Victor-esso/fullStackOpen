
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

// routers
const contactRouter = require('./controllers/contact')

const { Contact } = require('./models/contact')


app.use(middleware.requestLogger)

app.use('/api/contacts',contactRouter)


app.get('/info', (request , response) => {
  Contact.find({})
    .then(contacts => {
      const time = new Date()
      response.send(`Phonebook has info for ${contacts.length} people <br/> <br/> ${time.toString()}`.trim())
    })
    .catch(e => {
      response.send(`Could not access the database - error : ${e}`.trim())
    })
})

// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint)

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(middleware.errorHandler)


app.listen(config.PORT , () => {
  logger.info(`server is running on port http://localhost:${config.PORT}/`)
  logger.info(` database url : ${config.MONGO_URL}`)
})

// Export the app as a serverless function
// module.exports.handler = serverless(app);