//Chinenye Okpalanze
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://chika:applebaum@cluster0.y8ywx.mongodb.net/travelexperts?retryWrites=true&w=majority";


  //create a collection in the travelexperts database called contact Us where information received from the contact Us form will be stored
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("travelexperts");
    var myobj = [
      { firstName: 'John', lastName: 'Peter', Email: 'john.peter@yahoo.com', Subject: 'Trip to Seychelles', Message: 'Please tell me the best deal you have for a trip to seychelles between 08/01/2020 and 09/30/2020'},
      { firstName: 'Amy', lastName: 'Hannah', Email: 'amy.hannah@yahoo.com', Subject: 'Wedding package', Message: 'Could you send me the wedding packages all inclusive for a destination wedding in Cook Island'},
      { firstName: 'Michael', lastName: 'Sandy', Email: 'michael.sandy@yahoo.com', Subject: 'Family Vacation for 4', Message: 'I want all expense paid trip for a family vacation to Maldives between 08/01/2020 and 09/30/2020'}
    ];
     // creates 'contactus' collection in travelexperts database and inserts documemts in the collection
    dbo.collection("contactus").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      // close the connection to db when you are done with it
      db.close();
    });
  });

 


