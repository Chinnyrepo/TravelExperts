//Chinenye Okpalanze
const Customers = require('./user.model')
const bcrypt = require('bcryptjs')


// Creates a new Customer in the database
exports.createUser = function (customers, callBack) {
    //encrypt the password then store the encrypted password in the DB with the rest of the customer info
    bcrypt.hash(customers.password, 10, (err, hashedPassword) => {
        customers.password = hashedPassword;  // replace the password with it's encrypted version
        const myuser = new Customers(customers);  // Customer Mongoose Model
        myuser.save(function (err) {    // Saves the user to the DB
            //if (err) return console.error(err);
            callBack(err, 'Ok');
        })
    });
}

//Customer Login
exports.verifyLogin = function (CustEmail, password, callBack) {
    Customers.findOne({ CustEmail }, (err, customers) => {
        if (err) return callBack(err);
        // If email not found
        if (!CustEmail) return callBack(null, false, { message: "Incorrect email" });
        //compare the given password with the store encyption
        bcrypt.compare(password, customers.password, (err, res) => {
            if (err) return callBack(err);
            if (res) {
                // passwords match! log customer in
                return callBack(null, user);
            } else {
                // passwords do not match!
                return callBack(null, false, { message: "Incorrect password" });
            }
        })
    });
}