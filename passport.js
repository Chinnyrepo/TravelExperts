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


module.exports = (app) => {
  // Allows us to assign every user of the app a unique session, which allows us to store user state (are they logged in?)
  // secret is used to sign the session ID cookie – should be a random unique string
  app.use(session({
      secret: "myTravelWebsite secret",
      resave: false,
      saveUninitialized: true
  }));
  // To show login messages while redirecting. e.g. 'Incorrect Username'
  app.use(flash());

  // The login function
  passport.use(
      new LocalStrategy((email, password, done) => {
          //console.log(email, password)
          return data.verifyLogin(email, password, done)
      }));

  // User to store user data between requests
  // Allows the user to stay logged in for the same session
  passport.serializeUser(function (customers, done) {
      done(null, customers.email);
  });
  passport.deserializeUser(function (email, done) {
      data.getUser(email, function (err, customers) {
          done(err, customers);
      });
  });

  // initialize Passport
  app.use(passport.initialize());
  // initialize session
  app.use(passport.session());
  // Saving user object during request processing
  app.use((req, res, next) => {
      res.locals.currentCustomers = req.customers;
      next();
  });

 // User Login API 
  app.post( 
      "/log-in",
      passport.authenticate("local", {
          successRedirect: "/",
          failureRedirect: "/",
          failureFlash: true
      })
  );
  app.get("/log-out", (req, res) => { // User logout API
      req.logout();
      res.redirect("/");
  });
}

module.exports = app;
/* GET users listing. */
app.get('/', function (req, res, next) {
  console.log(req.query.email) // Get the user by email
  if (!req.query.email) return res.send(null); // Check if there is a value for the email
  data.getUser(req.query.email, (err, data) => {
    //console.log('In User Router')
    //console.log(err, data)
    res.send(data)  // Send back the results
  })
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
  
  //console.log(JSON.stringify(req.body));
  data.createUser(customers, (err, message) => {
    if (err) return res.status(500).send('Error ' + err);
    res.redirect("./thankyou3");
  });
});


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