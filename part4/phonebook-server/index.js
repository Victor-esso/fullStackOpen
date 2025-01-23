const express = require('express')
const func = require('./functions')
const app = express()
const PORT = 3030

app.use(express.json());
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
      "name": "victor esso", 
      "number": "09037871109"
    }
    
]


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
            response.json([ newContact , ...contacts ])
        )
    
})

app.get('/api/contacts/:id', (request , response) => {
    const id = request.params.id
    const contact = contacts.find(contact => contact.id === id)
    
    contact ? response.json(contact) : response.status(404).json({status:"contact not found"})
})

app.delete('/api/contacts/:id', (request , response) => {
    const id = request.params.id
    const updatedContacts = contacts.filter(contact => contact.id !== id)
    
    response.status(204)
})

app.get('/info', (request , response) => {
    const time = new Date()
    response.send(`Phonebook has info for ${contacts.length} people <br/> <br/> ${time.toString()}`.trim())
})



app.listen(PORT , () => {
    console.log(`server is running on port http://localhost:${PORT}/`)
})