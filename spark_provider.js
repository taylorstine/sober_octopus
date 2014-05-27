var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;


var sparkProvider =  function(){
  var dbName = 'sparkDB';
  var dbPath = 'mongodb://localhost:27017/' + dbName;
  return {
    getDbName: function(){return dbName;},
    getDbPath: function(){return dbPath;},
    
    getCollection: function(callback){
      var obj = this;
      MongoClient.connect(this.getDbPath(), function(err, db){
        db.collection(obj.getDbName(), {w:1}, function(err, collection){
          callback(err, collection);
        });
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
    }
    
    
  };
}
exports.sparkProvider = sparkProvider;
