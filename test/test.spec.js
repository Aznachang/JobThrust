var expect = require('chai').expect;
describe("A test suite", function() {
  beforeEach(function() { });
  afterEach(function() { });
  it('should fail', function() { 
    expect(true).to.be.true; 
  });
    it('should fail', function() { 
    var num = 5;
    expect(num).to.equal(5); 
  });
});