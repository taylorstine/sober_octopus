var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;


module.exports = function(){
  var dbName = 'sparkDB';
  var dbPath = 'mongodb://localhost:27017/' + dbName;
  var offset = 0;
  return {
    getDbName: function(){return dbName;},
    getDbPath: function(){return dbPath;},
    
    getCollection: function(callback){
      var obj = this;
      MongoClient.connect(this.getDbPath(), function(err, db){
        if (err){
          console.log(err);
        }
        if (db){
          db.collection(obj.getDbName(), {w:1}, function(err, collection){
            callback(err, collection);
          });
        }
      });
    },

    save: function(item, callback){
      this.getCollection(function(err, collection){
        if (callback){
          collection.insert(item, {w:1}, function(err, result){
            callback(err, result);
          });
        }else{
          collection.insert(item, {w:0});
        }
      });
    },

    getAll: function(callback){
      this.getCollection(function(err, collection){
        collection.find().toArray(function(err, items){
          callback(err, items);
        });
      });
    },

    get: function(offset, limit, callback){
      var obj = this;
      this.getCollection(function(err, collection){
        var cursor = collection.find()
        if (limit){
          cursor.limit(parseInt(limit, 10));
        }
        if (offset){
          cursor.skip(parseInt(offset, 10));
        }
        var stream = cursor.stream();
        callback(stream);
      });
    }
    
  };
}
