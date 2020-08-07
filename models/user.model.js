//Oyakhire Airende
const mongoose = require('./mongoose_connect');
// Creating the Customers Schema
const customersSchema = new mongoose.Schema({
    CustFirstName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    CustLastName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    retypepassword: {
        type: String,
        required: true,
        trim: true
    },
    CustAddress: String,
    CustCity: String,
    custProv: String,
    CustPostal: String,
    CustCountry: String,
    CustHomePhone: Number,
    CustBusPhone: Number,
    CustEmail: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
});
// Creating the Customer collection Model
module.exports = mongoose.model('customers', customersSchema);

