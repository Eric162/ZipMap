$(document).ready(function() {
  var map = L.map('mapId', {
    center: [37.09, -95.71],
    zoom: 4
  })

  L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: ['a','b','c']
  }).addTo(map);



});
