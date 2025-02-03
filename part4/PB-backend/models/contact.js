require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

async function connectDB() {
    try {
        await mongoose.connect(process.env['database.loginString']);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error(`❗️❗️❗️ Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit script on failure
    }
}

connectDB();

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true , unique: true },
    number: { type: Number, required: true }
});

contactSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
    }
});

module.exports.Contact = mongoose.model('Contact', contactSchema, 'contacts'); // Explicit collection name
