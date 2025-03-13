const config = require('./utils/config')
const app = require('./app')


app.listen( config.PORT , () => {
    console.log(`app is listening on port http://localhost:${config.PORT}/`)
} )