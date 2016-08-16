var app = angular.module('zips', ['leaflet-directive']);
app.controller("GeoJSONController", [ '$scope', function($scope) {
  angular.extend($scope, {
    usa: {
      lat: 37.09,
      lng: -95.71,
      zoom: 4
    },
  });
}]);

app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
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

$(document).ready(function() {

  $('input').keypress(function (e) {
    if (e.which == 13) {
      $('#zipForm').submit();
    }
  });

  $('#zipForm').on('submit', function(event) {
    console.log('Submitting..........');
    var zipString = $("input:first").val();
    if (zipString.length !== 5) {
      console.log("Bad zip string");
      return;
    }

    console.log("Valid input, getting zip data for: " + zipString);
    $.get(
       '/zip/' + zipString
     ).done(function(response){
       var zipData = response.content.zipData;
       console.log(response);
       console.log(zipData);
     });

  });

  // var zipInput = $('#zip');
  // $(document).on('submit', '#zipForm', function(evt) {
  //   console.log("Submitting........");
  //   evt.preventDefault();
  //   zipString = zipInput.value;
  //   console.log("length " + zipString);
  //   if (zipString.length !== 5) return;
  //   $.get(
  //     '/zip/' + zipString
  //   ).done(function(response){
  //     var zipData = response.content.zipData;
  //     console.log(response);
  //     console.log(zipData);
  //     //TODO
  //   }).fail()
  //
  // });

});
