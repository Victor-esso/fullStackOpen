const express = require('express') // for server management
const cors = require('cors') // cross origin management

const app = express()

app.use(express.static('dist'))
app.use(express.json())



// set Allowed Origins
// const allowedOrigins = [
//   'http://localhost:5173', // make sure the origin has no trailing slash
//   'http://localhost:3623'
// ]

// const corsOptions = {
//   origin: (origin , callback) =>{
//     //check if the incoming origin is in the allowed origins list
//     if(!origin || allowedOrigins.includes(origin)){
//       callback(null , true)
//     }else{
//       callback(new Error(`${origin} - Not allowed by CORS`))
//     }
//   }
// }
app.use(cors())

module.exports = app