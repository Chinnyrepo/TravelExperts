const { query } = require('express');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

exports.getContactData = (agencyId, callBack) => {

    if (!agencyId)
        getData("agencies", [agencyId], callBack);
    else
        getData("agents", [agencyId], callBack);
}

function getData(collection, arguments, callBack) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        //Specify the target DB
        var dbo = db.db("travelexperts");
        //The select query
        dbo.collection(collection).find({}).project({_id: 0}).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            //send the result back to the callback
            callBack(null, result);
            db.close();
        });
    });
}

/* Retrieve details of a vacation package
** Edwin GonoSantosa */
exports.getPackageData = (collectionName, targetId, callBack) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        //Specify the target database
        var dbo = db.db("travelexperts");
        
        //Find a particular document
        var query = { PackageId : targetId };
        dbo.collection(collectionName).find(query, { projection: { _id: 0, PkgDesc: 0 } } ).toArray(function(err, result) {
            if (err) throw err;
            callBack(null, result);
            db.close();
            //console.log('result', result);
            //return result;
        });
    });
}

/* Retrieve the product-supplier id for a vacation package
** Edwin GonoSantosa */
exports.getProductSupplierId = (collectionName, targetId, callBack) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        //Specify the target database
        var dbo = db.db("travelexperts");
        
        //Find a particular document
        var query = { PackageId : targetId };
        dbo.collection(collectionName).find(query, { projection: { _id: 0, PackageId: 0 } } ).toArray(function(err, result) {
            if (err) throw err;
            callBack(null, result);
            db.close();
        });
    });
}