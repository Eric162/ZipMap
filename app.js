// set variables for environment
var express = require('express');
var path = require('path');
var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');

// Connect to db
mongoose.connect('mongodb://localhost/maptest');
var db = mongoose.connection;
db.on('error', function() { console.log('connection error'); });
db.once('open', function (callback) {
    console.log("database connected");
});

// Import route handlers
var zipcodes = require('./routes/zip');

// Import Zip model
var ZipCode = require('./models/zipcodeModel');

var app = express();

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // use either jade or ejs
// instruct express to server up static assets
app.use(express.static('public'));

app.use('/zip', zipcodes);

// routes
app.get('/', function(req, res) {
  res.render('map_view');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.redirect('/');
//  next(err);
});

// Set server port
app.listen(3000);
console.log('server is running');
