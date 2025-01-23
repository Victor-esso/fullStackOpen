const express = require('express')
const app = express()
const PORT = 3030

contacts = [
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
    }
]


app.get('/api/contacts', (request , response) => {
    response.json(contacts)
})
app.get('/info', (request , response) => {
    // response.send('<h1>Victor is king</h1>')
    response.send(`
        Phonebook has info for ${contacts.length} people   
    `)
})



app.listen(PORT , () => {
    console.log(`server is running on port http://localhost:${PORT}/`)
})