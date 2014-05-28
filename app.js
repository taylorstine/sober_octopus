var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var JSONStream = require('JSONStream');
var SlowStream = require('slow-stream');

var routes = require('./routes');
var users = require('./routes/user');

var provider = require('./spark_provider')();
var EventEmitter = require('events').EventEmitter;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user

app.get('/', function(req, res, next){
  res.render('index', { title: 'Express' });
});

app.get('/items', function(req, res, next){
  res.set('Content-Type', 'application/json');
  console.log('got a request');
  var offset = req.param('offset') || 0;
  var limit = req.param('limit') || 10;
  var listener = Object.create(EventEmitter.prototype);
  listener.on('data', function(item){
    console.log(item);
  });
  listener.on('end', function(){
    res.end('got it');
  });
  //provider.get(offset, limit, listener);
  provider.get(offset, limit, function(stream){
    stream.pipe(new SlowStream({maxWriteInterval:10})).pipe(JSONStream.stringify()).pipe(res);
    stream.on('end', function(){res.end();});
  });
});

var port = 3000;
app.listen(port);
console.log("server listening on port %s", port);
