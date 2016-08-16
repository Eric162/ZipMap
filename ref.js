
		var map = L.map('map').setView([40, -95], 3);
		// add a CloudMate tile layer
		L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/998/256/{z}/{x}/{y}.png').addTo(map);


var json;
var markers = new Array();
var markerGroup = L.layerGroup([]);

$.ajax({

    url: 'data/zipcodes.tsv',
    success: function parse(data) {
    	json = convert(data);

      //lets provide geo info on click
      map.on('click', function(e) {
        var lon = e.latlng.lng.toPrecision(4);
        var lat = e.latlng.lat.toPrecision(4);
        console.log(lat+','+lon);
      });
    }
});



$('#zip').keyup(function() {
	var val = $('#zip').val();
  if($.isNumeric(val)){
    var len = val.length;
    var codes = json.filter(function(f){ return f.zip.substring(0,len)==val; });
    if(codes.length>0){
      $('#label').html("");
      var latlng = [codes[0].lat,codes[0].lon];
      markers = [];

     switch (len){
      case 0:
        map.setView([40, -95], 3);
        map.removeLayer(markerGroup);
        break;
      case 1:
        map.setView(latlng,5);
        map.removeLayer(markerGroup);
        break;
      case 2:
        map.setView(latlng,7);
        map.removeLayer(markerGroup);
        break;
      case 3:
        map.removeLayer(markerGroup);
        var fitmarkers = new Array();
        codes.forEach(function(f){
          var points = [f.lat,f.lon];
          fitmarkers.push(points);
        });
        var bounds = new L.LatLngBounds(fitmarkers);
        map.fitBounds(bounds);
        break;
      case 4:
        map.setView(latlng,11);
        map.removeLayer(markerGroup);

        codes.forEach(function(f){
          var name = f.zip;
          var myIcon = L.divIcon({className: 'zipcode', html: name});
          var arr = [f.lat,f.lon];
          var marker = new L.marker(arr, {icon: myIcon});
          markers.push(marker);
        });
        //demostrate how to add and remove multiple markers by using a layer group! instead of just amrkers like u did before!!@
        markerGroup = L.layerGroup(markers);
        map.addLayer(markerGroup);
        break;
      case 5:
        map.setView(latlng,13);
        break;
     }
    } else {
      $('#label').html(val+" does not exist.");
    }

  }
});


//var tsv is the TSV file with headers
function convert(tsv){

  var lines=tsv.split("\n");

  var result = [];

  var headers=lines[0].split("\t");

  for(var i=1;i<lines.length-1;i++){

	  var obj = {};
	  var currentline=lines[i].split("\t");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

  }

  return result;
}
