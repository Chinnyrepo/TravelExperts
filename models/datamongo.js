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

