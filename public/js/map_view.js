var app = angular.module('zips', ['leaflet-directive']);
app.controller("GeoJSONController", ['$scope', '$http', 'leafletData', function($scope, $http, leafletData) {

    var getStyle = function(feature) {
        return {
            fillColor: 'red',
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    };

    var createGeoJsonObject = function(data) {
        return {
            data: data,
            style: getStyle
        };
    };

    angular.extend($scope, {
        center: {
            lat: 37.09,
            lng: -95.71,
            zoom: 4
        },
        zip: '',
        geojson: {}
    });

    $scope.centerJSON = function(index) {
        leafletData.getMap().then(function(map) {
            var latlngs = [];
            for (var i in $scope.geojson.data.geometry.coordinates) {
                var coord = $scope.geojson.data.geometry.coordinates[i];
                // console.log(coord);
                for (var j in coord) {
                    var points = coord[j];
                    console.log(points);
                    latlngs.push(L.GeoJSON.coordsToLatLng(points));
                }
            }
            map.fitBounds(latlngs);
        });
    };

    $scope.getZipData = function(zipString) {
        if (zipString.length !== 5) return;
        console.log("getting zip data");

        $http({
            method: 'GET',
            url: '/zip/' + zipString
        }).success(function(data) {
            var zipData = data.content.zipData;
            if (zipData === null) return;

            console.log(zipData);
            $scope.geojson = createGeoJsonObject(zipData);
            console.log("Data in model ($scope.geojson): ");
            console.log($scope.geojson);

            $scope.centerJSON();
        })
    };



}]);

app.directive('numbersOnly', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

app.directive("limitTo", [function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keypress", function(e) {
                if (this.value.length == limit) e.preventDefault();
            });
        }
    }
}]);

// $(document).ready(function() {
//
//   // $('input').keypress(function (e) {
//   //   if (e.which == 13) {
//   //     $('#zipForm').submit();
//   //   }
//   // });
//   //
//   // $('#zipForm').on('submit', function(event) {
//   //   console.log('Submitting..........');
//   //   var zipString = $("input:first").val();
//   //   if (zipString.length !== 5) {
//   //     console.log("Bad zip string");
//   //     return;
//   //   }
//   //
//   //   console.log("Valid input, getting zip data for: " + zipString);
//   //   $.get(
//   //      '/zip/' + zipString
//   //    ).done(function(response){
//   //      var zipData = response.content.zipData;
//   //      console.log(response);
//   //      console.log(zipData);
//   //    });
//   //
//   // });
//
//   // var zipInput = $('#zip');
//   // $(document).on('submit', '#zipForm', function(evt) {
//   //   console.log("Submitting........");
//   //   evt.preventDefault();
//   //   zipString = zipInput.value;
//   //   console.log("length " + zipString);
//   //   if (zipString.length !== 5) return;
//   //   $.get(
//   //     '/zip/' + zipString
//   //   ).done(function(response){
//   //     var zipData = response.content.zipData;
//   //     console.log(response);
//   //     console.log(zipData);
//   //     //TODO
//   //   }).fail()
//   //
//   // });
//
// });
