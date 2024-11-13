const mongoose = require('mongoose');
const Contact = require('./models/Contact');
const contacts = require('./data/contactsData');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  await Contact.deleteMany();  // Clear the database
  await Contact.insertMany(contacts);  // Insert sample contacts
  console.log('Data imported successfully!');
  process.exit();
})
.catch(error => {
  console.error('Error importing data:', error);
  process.exit(1);
});