/*
Mocha tests for the app.
 */
var assert = require('assert');

//TODO remove this test
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
