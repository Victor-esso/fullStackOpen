const contactRouter = require('express').Router()
const { Contact } = require('../models/contact')

contactRouter.get('/',(request , response, next) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  }).catch(error => next(error))
})

contactRouter.post('/', (request , response, next) => {
  try{
    const { name , number } = request.body

    if (!name || !number) {
      return response.status(400).json({ error: '❌ Name and number are required' })
    }
    const contact = new Contact({ name, number })
    contact.save().then(nContact => {
      return response.status(201).json(nContact)
    }).catch(error => next(error))

  }catch(e){
    console.log(e)
    response.status(500).json({
      error : 'Internal server error'
    })
  }
})

contactRouter.get('/:id', (request , response) => {
  const id = request.params.id
  Contact.findById(id)
    .then(contact => {
      response.json(contact)
    })
    .catch(error => {
      console.log(`Error : ${error}`)
      response.status(404).json({ status:'contact not found' })
    })
})

contactRouter.delete('/:id', (request , response , next) => {
  const id = request.params.id
  Contact.findByIdAndDelete(id)
    .then(deletedContact => {
      response.status(200).json(deletedContact)
    })
    .catch(error => next(error))
})

contactRouter.put('/:id' , (request , response , next) => {
  const { id , ...updatedContact } = request.body

  Contact.findByIdAndUpdate(id,updatedContact, { new: true, runValidators: true , context: 'query' })
    .then(contact => {
      response.status(201).json(contact)
    }).catch(error => next(error))

})



module.exports = contactRouter