const express = require('express') // for server management
const morgan = require('morgan'); // logger

const func = require('./functions') // mine
const chalk = require('chalk') // colors on logger
const cors = require('cors') // cross origin management
require('dotenv').config();
const app = express()
const PORT = process.env.PORT || 3000

// set Allowed Origins
const allowedOrigins = [
  'http://localhost:5173', // make sure the origin has no trailing slash
  'http://localhost:3623'
]

const corsOptions = {
  origin: (origin , callback) =>{
    //check if the incoming origin is in the allowed origins list
    if(!origin || allowedOrigins.includes(origin)){
      callback(null , true)
    }else{
      callback(new Error(`${origin} - Not allowed by CORS`))
    }
  }
}

app.use(express.static('dist'));

app.use(express.json());
app.use(cors(corsOptions))
app.use(morgan((tokens, req , res) => {
        let method = req.method.toUpperCase();
        let status = Number(tokens.status(req , res));
        console.log(`\n${''.padStart(80,'-')} \n `)
        
        console.log([
            (status >=200 && status <=299) ? chalk.greenBright(status) : ([400].includes(status) ? chalk.yellow(status) : chalk.redBright(status)),
            chalk.blackBright(method),
            tokens.url(req , res), '-',
            chalk.cyanBright(tokens['response-time'](req , res)) + chalk.cyan(' ms'),
        ].join(' '))
        
        if(Object.entries(req.body).length){
            console.dir(req.body , { depth: null, colors: true })
        }
        
}))

const contacts = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    { 
      "id": "5",
      "name": "victor esso Okeke", 
      "number": "09037871109"
    }
    
]

app.get('/', ( request , response ) => {
  response.send('<h1>Welcome</h1>')
})

app.get('/api/contacts', (request , response) => {
    response.json(contacts)
})

app.post('/api/contacts', (request , response) => {
    let id = func.getRandomInt(10,4000)
    const newContact =  {id, ...request.body}

    let duplicateName = contacts.find(contact => contact.name.toLowerCase().trim() === newContact.name.toLowerCase().trim())
    let duplicateNumber = contacts.find(contact => contact.number.trim() === newContact.number.trim())
    
    duplicateName ? 
        response.status(400).json({error : "Name must be unique"}) 
        :
        (duplicateNumber ? 
            response.status(400).json({error : "Number must be unique"})
            :
            response.json(newContact)
        )
    
})

app.put('/api/contacts/:id' , (request , response) => {
  const updatedContact = request.body;

  // perform update on the specific contact
  const contactsUpdated = contacts.map(contact => contact.id == updatedContact.id ? updatedContact : contact)
  console.dir(contactsUpdated);

  response.json(updatedContact);
  
})

app.get('/api/contacts/:id', (request , response) => {
    const id = request.params.id
    const contact = contacts.find(contact => contact.id === id)
    
    contact ? response.json(contact) : response.status(404).json({status:"contact not found"})
})

app.delete('/api/contacts/:id', (request , response) => {
    const id = request.params.id
    const deletedContact = contacts.find(contact => contact.id === id)
    if(!deletedContact){
      response.status(404).json({error:"Invalid Contact-ID sent"})
    }
    const updatedContacts = contacts.filter(contact => contact.id !== id)
    
    response.status(200).json(deletedContact)
})

app.get('/info', (request , response) => {
    const time = new Date()
    response.send(`Phonebook has info for ${contacts.length} people <br/> <br/> ${time.toString()}`.trim())
})


app.listen(PORT , () => {
    console.log(`server is running on port http://localhost:${PORT}/`)
})

// Export the app as a serverless function
// module.exports.handler = serverless(app);