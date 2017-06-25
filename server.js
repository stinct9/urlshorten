var express = require("express");
var bodyParser = require('body-parser');
var shortid = require('shortid');
var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var app = express();

function insertData (doc) {
  mongo.connect(url, function(err, db) {
    if(err) throw err;
    
    //db.createCollection("urls");
    
    var collection = db.collection('urls');
    
     collection.insert(doc, function(err, data) {
       if (err) throw err;
       //console.log(JSON.stringify(doc));
     });
  db.close();
  });
}

function shorten(req, res) {
  
    var data = req.params.url; console.log(data);
    
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (data.match(regex)) {
      console.log("This is a valid URL");
      
      var id = shortid.generate();
      
      var doc = {
        id : id,
        url : data
      }, 
      urlResponse = {
        original_url : data,
        short_url : id
      };
      
      insertData(doc, res.send(urlResponse));
    } 
    
    else {
      console.log("Not a valid url. Please use a valid url");
    }
}

app.get("/shorten/:url(*)", shorten);
//app.get("/shorten/https://:data", shorten);


app.get("/:data", function(req, res) {
  var data = req.params.data;
  //console.log(data);
  //console.log("value of function"+findLink(data));
  
  mongo.connect(url, function(err, db) {
    if(err) throw err;
    
    var collection = db.collection('urls');
    
    collection.find({ id: data }).toArray(function(err, documents) {
                if(err) throw err;
                db.close();
                
                console.log("found this url "+documents[0].url);
                if (documents.length > 0){
                  res.redirect(documents[0].url);
                }
                else res.send("Sorry. Could not find the short url");
                
            });
    db.close();
  });
  
});

app.listen(8080, function() {
    console.log("App running on 8080");
});