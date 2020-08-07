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

    