const morgan = require('morgan')
const chalk = require('chalk')


const requestLogger  =  morgan((tokens, req, res) => {
  let method = req.method.toUpperCase()
  let status = Number(tokens.status(req, res) || 500) // Default to 500 if undefined
  let responseTime = tokens['response-time'](req, res) || '0'

  console.log(`\n${'-'.repeat(80)}\n`)

  console.log(
    [
      status >= 200 && status <= 299
        ? chalk.greenBright(status)
        : [400].includes(status)
          ? chalk.yellow(status)
          : chalk.redBright(status),
      chalk.blackBright(method),
      tokens.url(req, res),
      '-',
      chalk.cyanBright(responseTime) + chalk.cyan(' ms'),
    ].join(' ')
  )

  if (Object.keys(req.body).length) {
    console.dir(req.body, { depth: null, colors: true })
  }

  console.log(`\n${'-'.repeat(80)}\n`)

  return '' // Ensures Morgan doesn't break
})

const unknownEndpoint = (request, response) => {
  console.log(request.url)
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log(error.errors)

  switch (error.name) {

  case 'MongooseError':
    return response.status(400).json({ error : error.message })

  case 'MongoServerError':
    return response.status(400).json({ error : error.message })

  case 'CastError':
    return response.status(400).send({ error: 'malformatted id' })

  case 'ValidationError':
    return response.status(400).json({ error : error.errors })

  default:
    next(error)
    break
  }

}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}