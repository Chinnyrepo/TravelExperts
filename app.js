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
const random = require('./models/randomModule');
const { ppid } = require("process");

module.exports = app;

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

// to get data from the contact us page and store it a collection called contactus in the mongodb travelexperts database
//chinenye okpalanze
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
    res.redirect("./thankyou1");
 });

 /* Serving request for contact info of agencies and agents from the contact us page. 
 ** Chinenye Okpalanze*/
app.get('/contactdata', function (req, res, next) {
  // Getting the agency information
  data.getContactData(null, (error, agencies) => {
    if (error) return res.status(500).send('Error ' + error);
    // Get agents information 
    data.getContactData(1, (error, agents) => {
      res.send({agencies, agents}); 
      //console.log(agents)
    })
  })
});

// to get data from the registration page and store it in customer collection in the mongodb travelexperts database
//Oyakhire Airende
app.post("/registerdata", (req, res) => {
  //Connecting to the mongodb database
  MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    var dbo = db.db("travelexperts");
    
    // Use a node module to sequentially increment CustomerId field in the CUSTOMERS collection
    autoIncrement.getNextSequence(dbo, "customers", function (err, autoIndex) {
      dbo.collection("customers").insertOne({
          CustomerId: autoIndex,
          CustFirstName: req.body.firstname,
          CustLastNme: req.body.lastname,
          CustAddress: req.body.address,
          CustCity: req.body.city,
          CustProv: req.body.province,
          CustPostal: req.body.postalcode,
          CustCountry: req.body.country,
          CustHomePhone: req.body.homephone,
          CustBusPhone: req.body.busphone,
          CustEmail: req.body.email,
          AgentId: 1
      });  
  });
  });
//to redirect the customer to thankyou page
res.redirect("./thankyou3");
});

/* Serving a request for vacation packages 
** Edwin GonoSantosa*/
app.get('/packages', (req, res) => {
  //Query PACKAGES collection from TRAVELEXPERTS database
  MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    const dbo = db.db("travelexperts");
    //Retrieve all documents in the collection where end date > today's date
    dbo.collection("packages").find({"PkgEndDate" : { $gte : new Date() } }).toArray(function(err, result) {
      if (err) throw err;
      db.close();
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

/* Serving a request to submit data from the order form to the database
** Edwin GonoSantosa */
app.post('/orderformdata', (req, res) => {
  // Variable definitions  
  let reserveDate = new Date();
  let randomChars = random.getRandomString(5);
  let randomNum = random.getRandomInt(3);
  let customerNum = 0;
  let bookingNum = 0;
  let tripType = parseInt(req.body.tripType);
  let packageNum = parseInt(req.body.packageId);
  
  // Retrieve details of the selected vacation package from the PACKAGES Collection
  /* Issue to resolve: capture the data from callback function call to populate
  ** the bookingdetails collection */
  data.getPackageData("packages", packageNum, (error, result) => {
    if (error) return res.status(500).send('Error ' + error);
    console.log('packages_data:', result);
  });

  // Retrieve product supplier id for the selected vacation package from the 
  // PACKAGES_PRODUCTS_SUPPLIERS Collection
   /* Issue to resolve: capture the data from callback function call to populate
  ** the bookingdetails collection */
  data.getProductSupplierId("packages_products_suppliers", packageNum, (error, ProdSuppId) => {
    if (error) return res.status(500).send('Error ' + error);
    console.log("prod supp id: ", ProdSuppId); 
  });
  
  
  // Open a connection to the database to insert documents into certain collections
  MongoClient.connect(url, function (err, db) {
      const dbo = db.db("travelexperts");
      
  // Insert a document into CUSTOMERS collection
  // Use a node module to sequentially increment CustomerId field in the CUSTOMERS collection
      autoIncrement.getNextSequence(dbo, "customers", function (err, autoIndex) {
        customerNum = autoIndex;
        dbo.collection("customers").insertOne({
          CustomerId: autoIndex,
          CustFirstName: req.body.fname,
          CustLastNme: req.body.lname,
          CustAddress: req.body.address1,
          CustCity: req.body.city,
          CustProv: req.body.prov,
          CustPostal: req.body.postCode,
          CustCountry: req.body.country,
          CustHomePhone: req.body.homePhone,
          CustBusPhone: req.body.busPhone,
          CustEmail: req.body.email,
          AgentId: req.body.agentId 
        });
      });
      
      // Insert a document into BOOKINGS collection. Assume 1 traveller per booking
      autoIncrement.getNextSequence(dbo, "bookings", function (err, autoIndex) {
        bookingNum = autoIndex; 
        dbo.collection("bookings").insertOne({
          BookingId: autoIndex,
          BookingDate: reserveDate,
          BookingNo: randomChars,
          TravellerCount: 1,
          CustomerId: customerNum,
          TripTypeId: tripType,
          PackageId: packageNum
        });
      });
      
      // Insert a document into BOOKINGDETAILS collection
      autoIncrement.getNextSequence(dbo, "bookingdetails", function (err, autoIndex) {
        dbo.collection("bookingdetails").insertOne({
          BookingDetailId: bookingNum,
          ItineraryNo: randomNum,
          //TripStart: packageData[0].PkgStartDate,
          //TripEnd: packageData[0].PkgEndDate,
          //Description: packageData[0].PkgName,
          Destination: '',
          //BasePrice: packageData[0].PkgBasePrice,
          //AgencyCommission: packageData[0].PkgAgencyCommission,
          BookingId: bookingNum,
          RegionId: '',
          ClassId: '',
          FeeId: '',
          //ProductSupplierId: ProdSuppId[0].ProductSupplierId 
        });
        //db.close(); 
      })
  });
  
  res.redirect("./thankyou2.html");
});

//This is for debuging purposes
/* 
app.get("/debug", (req, res) => {
  let randomVar = random.getRandomInt(3);
  console.log(randomVar);
  res.send(randomVar.toString(10));
});
*/

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