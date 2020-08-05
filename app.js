//import modules
const port = 8000;
const path = require("path");
const express = require("express");
const app = express();
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";
var autoIncrement = require("mongodb-autoincrement");
const bodyParser = require("body-parser");
const data = require('./models/datamongo');

module.exports = app;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


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
      res.send({agencies, agents}); 
      console.log(agents)
    })
  })
});

/* Serving request for list of packages from packages.html
** Edwin GonoSantosa*/
app.get('/packages', (req, res) => {
  //Query PACKAGES collection from TRAVELEXPERTS database
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("travelexperts");
    //Retrieve all documents in the collection where end date > today's date
    dbo.collection("packages").find({"PkgEndDate" : { $gte : new Date() } }).toArray(function(err, result) {
      if (err) throw err;
      db.close()
      //console.log(result);
      //Send retrieved data from collection to the html page
      if (result.length){
        res.send(result);
      }
      else {
          res.send('No Data');      
      }
    });
  }); 
});

//Serving static files in Express
app.use(express.static("public", {
    extensions: ["html", "css", "js", "jpg" , "jpeg", "png", "gif"]
}));

//Endpoint handler for error page
app.get("*", (req, res) => {
  // /to render error page
  res.status(404).send("<h1>404: Sorry can't find that!</h1>");
});

//Listening function on port 8000
app.listen(8000, (err) => {
  if (err) throw err;
  console.log(`Server is listening on port ${port}`);
});