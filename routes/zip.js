var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var ZipCode = require('../models/zipcodeModel');

router.get('/:zipcode', function(req, res) {
  var zipReq = req.params.zipcode;
  console.log("zip requested: " + zipReq);
    // ZipCode.findOne({'properties.ZCTA5CE10':zipReq}, function(err, zipData) {
    //   console.log(zipData);
    //   if (error) utils.sendErrResponse(res, 500, "An error occurred retreiving zip");
    //   else utils.sendSuccessResponse(res, {zipData:zipData});
    // });
    ZipCode.findOne({'properties.ZCTA5CE10':zipReq})
      .exec(function(error, zipData) {
        // console.log(zipData);
        if (error) utils.sendErrResponse(res, 500, "An error occurred retreiving zip");
        else utils.sendSuccessResponse(res, {zipData:zipData});
    });
});

module.exports = router;
