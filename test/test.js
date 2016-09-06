/*
Mocha tests for the app.
 */
var assert = require('assert');
// var webdriver = require('selenium-webdriver');
var helpers = require('../public/js/helpers.js');

// var driver = new webdriver.Builder().
// withCapabilities(webdriver.Capabilities.chrome()).
// build();
//
// describe('ZipMap', function() {
//     var url = "http://localhost:3000";
//     driver.get(url);
//
//     describe('#title', function() {
//         this.timeout(15000);
//         it('should be ZipMap', function(done) {
//
//             // console.log(url);
//             driver.manage().window().maximize();
//             var title = "ZipMap";
//
//             driver.getTitle().then(function(actual) {
//                 console.log("Title:  " + actual); //
//                 assert.equal(title, actual);
//                 done();
//             });
//         });
//     });
//
//     describe('#goButtonPresent', function() {
//         this.timeout(15000);
//         it('should be present on the page', function(done) {
//             driver.findElement(webdriver.By.css("input[type='button'][value='Go']")).isDisplayed().then(function(displayed) {
//                 assert.ok(displayed);
//                 done();
//             });
//         });
//     });
//
//     describe('#goButtonEnabled', function() {
//         this.timeout(15000);
//         it('should be enabled', function(done) {
//             var textBox = driver.findElement(webdriver.By.id("zip"));
//             textBox.clear();
//             textBox.sendKeys("04758");
//             driver.findElement(webdriver.By.css("input[type='button'][value='Go']")).isEnabled().then(function(enabled) {
//                 assert.ok(enabled);
//                 done();
//             });
//         });
//     });
//
//     describe('#leafletZoomToArea', function() {
//         this.timeout(15000);
//         it('should zoom to the correct coordinates', function(done) {
//             driver.findElement(webdriver.By.id("zip")).sendKeys("04758");
//             driver.findElement(webdriver.By.css("input[type='button'][value='Go']")).click();
//             driver.findElement(webdriver.By.className("leaflet-tile-container")).getLocation().then(function(loc) {
//                 assert.equal(loc.x, 8);
//                 assert.equal(loc.y, 98.875);
//                 done();
//             });
//         });
//     });
//
//     describe('#NoSubmitUnder5Numbers', function() {
//         it('should not submit with under 5 numbers', function(done) {
//             driver.get(url);
//
//             //tests page does not change when zip code is < 5
//             driver.findElement(webdriver.By.id("zip")).sendKeys("04");
//             driver.findElement(webdriver.By.css("input[type='button'][value='Go']")).click();
//
//             driver.findElement(webdriver.By.className("leaflet-tile-loaded")).getAttribute("style").then(function(style) {
//                 assert.equal(style, "height: 256px; width: 256px; left: 326px; top: 233px;");
//                 done();
//             });
//         });
//     });
//
//     describe('#Max5NumbersInZipInput', function() {
//         it('should only allow 5 numbers max to be entered', function(done) {
//             driver.get(url);
//             //tests page does not change when zip code is < 5
//             var zipInput = driver.findElement(webdriver.By.id("zip"))
//             zipInput.sendKeys("047589");
//             zipInput.getAttribute('value').then(function(text) {
//                 assert.equal(text, "04758");
//                 done();
//             });
//         });
//     });
//
//     describe('#NoLettersInZipInput', function() {
//         it('should not allow non-number characters in zip input', function(done) {
//             driver.get(url);
//             //tests page does not change when zip code is < 5
//             var zipInput = driver.findElement(webdriver.By.id("zip"));
//             zipInput.sendKeys("blah!");
//
//             zipInput.getAttribute('value').then(function(text) {
//                 assert.equal(text, "");
//                 driver.quit();
//                 done();
//             });
//         });
//     });
//
// });

describe('helpers.js', function() {
    describe('.createGeoJsonObject', function() {
        it('should return an object in the correct format', function() {
            var testData = {
                "stuff": 1
            }
            var data = {
                data: {
                    type: "FeatureCollection",
                    features: [testData]
                }
            }
            assert.deepEqual(helpers.createGeoJsonObject(testData), data);
        })
    })
})
