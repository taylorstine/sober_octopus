var provider = require('./spark_provider').sparkProvider();

console.log(provider.getDbName());
provider.save({"name":"taylor", "age":"24"}, function(err, result){
  provider.getAll(function(err, items){
    console.log(items);
  });
});




