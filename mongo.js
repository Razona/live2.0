var MongoClient = require('mongodb').MongoClient,
    settings = require('./settings');
MongoClient.connect("mongodb://localhost/"+settings.db, function(err, db) {
    if (err) { return console.dir(err); }
    console.log("connected to db");
    db.collection("users",function(err,collection){
       var docs=[
           {name:"hayato_razona",shake: 30},
           {name:"razona_0718",shake: 40},
           {name:"razona_lit",shake: 40}
           ];
           /*
           collection.find().toArray(function(err,items){
               console.log(items);
           });
           */
        var stream = collection.find().stream();
        stream.on("data", function(item) {
            console.log(item);
        });
        stream.on("end", function() {
            console.log("finished.")
        });
    });
});
