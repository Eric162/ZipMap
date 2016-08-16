var mongoose = require('mongoose');

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

ZipSchema.statics = {
  getZipData: function(zipString, callback) {
    this.findOne({'properties.ZCTA5CE10':zipString}, function(error, zipData) {
      if (error) cb(error);
      cb(null, song);
    })
  }
};


var ZipCode = mongoose.model('zips', ZipSchema);
module.exports = ZipCode;
