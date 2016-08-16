// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/maptest');

// Create a schema
var ZipSchema = new mongoose.Schema({
  type: String,
  properties: {
    ZCTA5CE10: String,
    GEOID10: String,
    CLASSFP10: String,
    MTFCC10: String,
    FUNCSTAT10: String,
    ALAND10: Number,
    AWATER10: Number,
    INTPTLAT10: String,
    INTPTLON10: String
  },
  geometry: mongoose.Schema.Types.Geometry
});

var ZipCode = mongoose.model('zips', ZipSchema)

ZipCode.findOne({'properties.ZCTA5CE10':'53405'}, function (err, zipcode) {
  if (err) return console.error(err);
  console.log(zipcode);
});
// ZipCode.find({}).count();



// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // use either jade or ejs
// instruct express to server up static assets
app.use(express.static('public'));

// routes
app.get('/', function(req, res) {
  res.render('map_view');
});






// Set server port
app.listen(3000);
console.log('server is running');
