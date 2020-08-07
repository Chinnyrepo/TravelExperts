//Chinenye Okpalanze
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://chika:applebaum@cluster0.y8ywx.mongodb.net/travelexperts?retryWrites=true&w=majority";

exports.getContactData = (agencyId, callBack) => {

    if (!agencyId)
        getData("agencies", [agencyId], callBack);
    else
        getData("agents", [agencyId], callBack);
}

function getData(collection, arguments, callBack) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        //specify the target DB
        var dbo = db.db("travelexperts");
        //the select query
        dbo.collection(collection).find({}).project({_id: 0}).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            //send the result back to the callback
            callBack(null, result);
            db.close();
        });
    });
}

/* function to retrieve details of a vacation package
** Edwin GonoSantosa */
exports.getPackageData = (collection, targetId, callBack) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db("travelexperts");
        var query = { "PackageId" : targetId };
        dbo.collection(collection).findOne(query, { projection : {_id: 0, PkgDesc: 0 } }, function(err, result) {
          if (err) throw err;
          callBack(null, result);
          db.close();
        });
    });
}

/* function to retrieve product-supplier id of a vacation package
** Edwin GonoSantosa */
exports.getProductSupplierId = (collection, targetId, callBack) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db("travelexperts");
        var query = { "PackageId" : targetId };
        dbo.collection(collection).find(query, { projection : {_id: 0 } }).toArray(function(err, result) {
          if (err) throw err;
          callBack(null, result);
          db.close();
        });
    });
}