require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
// mongoose.set('debug', true);

mongoose.connect(process.env['database.loginString'], {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Optional, increases timeout
});

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
  check : Boolean,
});

const Note = mongoose.model('note', noteSchema);

// const note = new Note({
//   content: 'Donal Trump is the president of America!',
//   important: true,
// });

// note.save()
//   .then(result => {
//     console.log('note saved!', result);
//     mongoose.connection.close();
//   })
//   .catch(err => {
//     console.error('Error saving note:', err);
//     mongoose.connection.close();
//   });


Note.find({important : false}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close();
})