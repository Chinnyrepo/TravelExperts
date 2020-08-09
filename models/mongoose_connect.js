//Chinenye Okpalanze
const mongoose = require('mongoose');
// const url = "mongodb+srv://chika:applebaum@cluster0.y8ywx.mongodb.net/travelexperts?retryWrites=true&w=majority";
const url = "mongodb://localhost:27017/travelexperts";
// Set up a mongoose connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
// Get the connection
const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose