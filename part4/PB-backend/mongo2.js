const mongoose =  require('mongoose');

// check to see how many arguments where sent
const password = process.argv[2] || false;
const contactName = process.argv[3] || false;
const contactNumber = process.argv[4] || false;

if(!password){
    console.log('❌ - No password was passed to the script')
    process.exit(1);
}


console.log('... Connecting to the database');
const url = `mongodb+srv://victoresso:${password}@testdatabase.eu3bz.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=testDatabase`;
mongoose.set('strictQuery',false);
mongoose.connect(url)
    .then(() => {
        console.log('✔️  Connected') 
        
        // create scheme
        const contactScheme = new mongoose.Schema({
            name : String,
            number : Number,
        })
        const Contact = mongoose.model('contact',contactScheme);
        if(!contactName || !contactNumber){
            console.log('... Getting all contacts')
            Contact.find({}).then(result => {
                console.log('✔️  Done \n','Phonebook :')
                result.forEach(contact => {
                    console.log(`${contact.name} ${contact.number}`)
                })
                mongoose.connection.close();
                process.exit(0);
            })
        }else{
            console.log('.. Saving New Contact')
            const contact = new Contact({
                name : contactName,
                number : contactNumber
            })

            contact.save()
                .then(result => {
                    mongoose.connection.close();
                    console.log('✔️  Done')
                    console.log(`Added name: ${result.name} number: ${result.number} to phonebook`)
                    process.exit(0);
                })
                .catch(error => {
                    console.log(`❌❌❌ ${error}`)
                    mongoose.connection.close();
                    console.log('✔️  Done')
                    process.exit(0);
                })
        }
    })
    .catch(error => {
        console.log('❌❌❌ Could not connect to the database Incorrect password passed')
        process.exit(1);
    })


