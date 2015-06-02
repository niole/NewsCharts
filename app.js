"use strict";
var dotenv = require('dotenv');
dotenv.load();

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Twitter = require('twitter');

// Database Routes
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/newscharts", {native_parser:true});

var routes = require('./routes/index');
var stream = require('./routes/stream');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* --- Make db accessible to our router ---*/
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/stream', stream);

/* GET home page. */
app.get('/');



/// catch 405 and forwarding to error handler
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
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on( 'SiteCA', function( object ) {
    console.log(' INSIDE SITECA SOCKET.ON');

      var countryArray = object[0].countryArray;
      var params = object[1];

      client.get('statuses/user_timeline', params, function(error, data){
        console.log('CLIENT GET');


        if (!error) {

          for ( var j = 0; j < data.length; j++ ) {

            var tweetText = " "+data[j].text;

            for ( var i = 0; i < countryArray.length; i++ ) {
              if (i !== countryArray.length - 1 &&
                  countryArray[i] !== "Zimbabwe" &&
                   tweetText.indexOf( countryArray[i] ) !== 0) {

                if ( tweetText.indexOf( countryArray[i] ) > -1 ||
                     tweetText.indexOf( countryArray[i].slice(0,1).toLowerCase() +
                     countryArray[i].slice(1,countryArray.length)) > -1 ) {

                    var country = countryArray[i];

                    if ( country === "Oman"  && tweetText[ tweetText.indexOf( country ) - 1] === " " ) {
                        socket.emit( data[j].user.screen_name, { "country": countryArray[i], "tweet": data[j] } );
                      }

                    if ( country !== "Oman" ) {

                      socket.emit( data[j].user.screen_name, { "country": countryArray[i], "tweet": data[j] } );
                    }
                }
              }
            }
         }
      }
    });
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

module.exports = app;
