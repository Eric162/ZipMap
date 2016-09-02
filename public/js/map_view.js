var app = angular.module('zips', ['leaflet-directive']);
app.controller("GeoJSONController", ['$scope', '$http', 'leafletData', function($scope, $http, leafletData) {

    var geoJsonLayer = L.geoJson();

    var createGeoJsonObject = function(data) {
        return {
            data: {
                type: "FeatureCollection",
                features: [data]
            }
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
            var type = $scope.geojson.data.features[0].geometry.type;
            if (type === "MultiPolygon") {
                for (var array in $scope.geojson.data.features[0].geometry.coordinates) {
                    var coords = $scope.geojson.data.features[0].geometry.coordinates[array];
                    for (var i in coords) {
                        var coord = coords[i];
                        for (var j in coord) {
                            var points = coord[j];
                            latlngs.push(L.GeoJSON.coordsToLatLng(points));
                        }
                    }
                }
            } else if (type === "Polygon") {
                for (var i in $scope.geojson.data.features[0].geometry.coordinates) {
                    var coord = $scope.geojson.data.features[0].geometry.coordinates[i];
                    // console.log(coord);
                    for (var j in coord) {
                        var points = coord[j];
                        // console.log(points);
                        latlngs.push(L.GeoJSON.coordsToLatLng(points));
                    }
                }
            } else {
                // TODO tell user bounds could not be drawn
                return;
            }

            map.fitBounds(latlngs);
            geoJsonLayer = L.geoJson($scope.geojson.data.features[0]).addTo(map);
        });
    };

    $scope.getZipData = function(zipString) {
        if (zipString.length !== 5) return;
        $http.get('/zip/' + zipString).success(function(data) {
            var zipData = data.content.zipData;
            if (zipData === null) return;
            $scope.geojson = createGeoJsonObject(zipData);
            geoJsonLayer.clearLayers();

            $scope.centerJSON();
        })
    };

    $scope.submit = function() {
        $scope.getZipData($scope.zip);
    }

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

function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange().text;
    }
    return text;
}

app.directive("limitTo", [function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            var inputField = angular.element(elem);
            angular.element(elem).on("keypress", function(e) {
                if (e.keyCode == 13) {
                    angular.element(elem).parent().submit;
                } else if (this.value.length == limit) {
                    var selected = getSelectedText();
                    if (selected.length > 0) {
                      return;
                    }
                    e.preventDefault();
                }
            });
        }
    }
}]);