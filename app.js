//import modules
const path = require("path");
const express = require("express");
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";
const bodyParser = require("body-parser");
const data = require('./models/datamongo');


//create express app
const app = express();

module.exports = app;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


//Serving Static files in Express
app.use(express.static("public", 
{
    extensions: ["html", "css", "js", "jpg" , "png", "gif"]
}));

// automatically check if requested file is found in /public
// if yes, return that file as a response to the browser
app.use(express.static(path.join(__dirname, 'public')));

// to get data from the contact us page and store it a collection called contactus in the mongodb travelexperts database
app.post("/contactus", (req, res) => {
     //Connecting to the mongodb database
     MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, db) => {
       if (err) throw err;
       var dbo = db.db("travelexperts");
       dbo.collection("contactus").insertOne(req.body, (err, res2) => {
         if (err) throw err;
         console.log("Contact Us Information inserted.");
         db.close();
       });
     });
    //to redirect the user to thankyou page
    res.redirect("../html/thankyou");
 });

 // /* GET contact us page. */
app.get('/contactdata', function (req, res, next) {
  // Getting the agency information
  data.getContactData(null, (error, agencies) => {
    if (error) return res.status(500).send('Error ' + error);
    // Get agents information 
    data.getContactData(1, (error, agents) => {
      res.send(agencies); 
      console.log(agents)
    })
  })
});

//Endpoint handler for error page
app.get("*", (req, res) => {
    // /to render error page
    res.status(404).render("Error");
});

//Listening function on port 8000
app.listen(8000, (err) => {
    if (err) throw err;
      console.log("Server is listening on port 8000. Ready to accept requests.");
});