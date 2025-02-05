require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error(`❗️❗️❗️ Error connecting to MongoDB: ${error.message}`)
    process.exit(1) // Exit script on failure
  }
}

connectDB()

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true ,
    unique: [true , 'Name already in use'] ,
    minLength : [3 , 'Too short, please provide a name with minimum of 5 characters']
  },
  number: {
    type: String,
    required: true,
  }
})

// validations
contactSchema.path('number').validate({
  validator : function (value) {
    if(String(value).length < 8){
      throw new Error('Must be a minimum of 8 characters')
    }
  }
})

contactSchema.path('number').validate({
  validator : function (value) {
    const phoneRegex = /^(\d{2,3})-(\d{5,})$/

    if(!phoneRegex.test(value)){
      throw new Error('Invalid phone number format. valid format = 00-000000')
    }
  }
})



contactSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports.Contact = mongoose.model('Contact', contactSchema, 'contacts') // Explicit collection name
