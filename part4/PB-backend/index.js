const express = require('express') // for server management
const morgan = require('morgan'); // logger

const func = require('./functions') // mine
const chalk = require('chalk') // colors on logger
const cors = require('cors') // cross origin management
require('dotenv').config();
const app = express()
const PORT = process.env.PORT || 3000

const { Contact } = require('./models/contact')


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

app.use(cors())

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


app.get('/api/contacts', (request , response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

app.post('/api/contacts', (request , response) => {
    try{
      const {name , number} = request.body;

      if (!name || !number) {
        return response.status(400).json({ error: '❌ Name and number are required' });
      }
      const contact = new Contact({ name, number });
      const savedContact = contact.save().then(nContact => {
        response.status(201).json(nContact);
      }).catch(e => {
        response.status(404).json({error : e})
      })



    }catch(e){
      response.status(500).json({
        error : 'Internal server error'
      })
    }
    
})

app.put('/api/contacts/:id' , (request , response) => {
  const {id , ...updatedContact} = request.body;
  
  
  Contact.findByIdAndUpdate(id,updatedContact, { new: true, runValidators: true })
    .then(contact => {
      response.status(201).json(contact);
    }).catch(e => {
      response.status(404).json({error : e})
    })
    
  
})

app.get('/api/contacts/:id', (request , response) => {
    const id = request.params.id
    Contact.findById(id)
      .then(contact => {
        response.json(contact)
      })
      .catch(error => {
        console.log(`Error : ${error}`)
        response.status(404).json({status:"contact not found"})
      })
})

app.delete('/api/contacts/:id', (request , response) => {
    const id = request.params.id
    Contact.findByIdAndDelete(id)
      .then(deletedContact => {
        response.status(200).json(deletedContact)
      })
      .catch(e => {
        response.status(404).json({error : e})
      })
})

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



app.listen(PORT , () => {
    console.log(`server is running on port http://localhost:${PORT}/`) 
})

// Export the app as a serverless function
// module.exports.handler = serverless(app);