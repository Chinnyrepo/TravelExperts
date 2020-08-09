var express = require('express');
const port = 8080;
const path = require("path");
const data = require('./models/mongoose_data')
const app = express();
let Customers = require('./models/user.model');
const bodyParser = require("body-parser");
// Configures app for Authentication using Passport.js
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var flash = require('connect-flash');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// automatically check if requested file is found in /public
// if yes, return that file as a response to the browser
app.use(express.static(path.join(__dirname, 'public')));

//Serving static files in Express
app.use(express.static("public", {
  extensions: ["html", "css", "js", "jpg" , "jpeg", "png", "gif"]
}));

  // initialize Passport
  app.use(passport.initialize());
  // initialize session
  app.use(passport.session());
  // Saving user object during request processing
  app.use((req, res, next) => {
      res.locals.currentCustomers = req.customers;
      next();
  });

//Creates a new Customer
app.post("/registerdata", (req, res, next) => {
  let customers = new Customers({
    CustFirstName: req.body.firstname,
    CustLastName: req.body.lastname,
    password: req.body.password,
    CustAddress: req.body.address,
    CustCity: req.body.city,
    CustProv: req.body.province,
    CustPostal: req.body.postalcode,
    CustCountry: req.body.country,
    CustHomePhone: req.body.homephone,
    CustBusPhone: req.body.busphone,
    CustEmail: req.body.email,
  });
  data.createUser(customers, (err, message) => {
    if (err) return res.status(500).send('Error ' + err);
    res.redirect("./thankyou3");
  });
});

app.post('/login', (req, res)=>{
  Customers.login(req.body.email, req.body.password, (err, result) =>{
    if (err){
      return res.json ({success: false, message:err});
    }
    return res.json({success: true, message:res});
  });
}),


//Endpoint handler for error page
app.get("*", (req, res) => {
  // /to render error page
  res.status(404).send("<h1>404: Sorry can't find that!</h1>");
});

//Listening function on port 8080
app.listen(8080,(err) => {
  if (err) throw err;
  console.log(`Server is listening on port ${port}`);
});