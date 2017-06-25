
var url = "mongodb://localhost:27017/";

var mongo = require('mongodb').MongoClient
    
var find = mongo.connect(url, function(err, db) {
        
        if(err) throw err;
        
        var collection = db.collection('urls');
        //var result;
        
        //console.log(db.collection('parrots'));
        
        return collection.find({
             id: 'SyYgOvNQW'
            }).toArray(function(err, documents) {
                if(err) throw err;
                //result = documents;
                db.close();
            
                
        });
    
    
    

    });
    
console.log(find);
    
    


