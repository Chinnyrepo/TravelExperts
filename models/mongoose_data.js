//Chinenye Okpalanze
const Customers = require('./user.model')
const bcrypt = require('bcryptjs')


// Creates a new Customer
exports.createUser = function (customers, callBack) {
    //encrypt the password then store the encrypted password in the DB with the rest of the customer info
    bcrypt.hash(customers.password, 10, (err, hashedPassword) => {
        customers.password = hashedPassword;  // replace the password with it's encrypted version
        const myuser = new Customers(customers);  // User Mongoose Model
        myuser.save(function (err) {    // Saves the user to the DB
            //if (err) return console.error(err);
            callBack(err, 'Ok');
        })
    });
}

// Get the user using the email (_id)
exports.getUser = function (email, callBack) {
    Customers.findByEmail(CustEmail, (err, data) => {
        callBack(err, data); // Send the results back
    });
}

// Checks the customer credentials. 
// if email & password, returns the customer object. Oherwise returns a message
exports.verifyLogin = function (email, password, callBack) {
    Customers.findOne({ CustEmail }, (err, customers) => {
        if (err) return callBack(err);
        // If email not found
        if (!customers) return callBack(null, false, { message: "Incorrect email" });
        //compare the given password with the stored encyption
        bcrypt.compare(password, customers.password, (err, res) => {
            if (err) return callBack(err);
            if (res) {
                //passwords match!log user in
                return callBack(null, customers);
            } else {
                //passwords do not match!
                return callBack(null, false, { message: "Incorrect password" });
            }
        })
    });
}


    