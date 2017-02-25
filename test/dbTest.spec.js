var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server.js');
var should = chai.should();

chai.use(chaiHttp);

  
describe('GET applications', function() {
  console.log(should)
  it('should list ALL jobs on api/application GET', function(done) {
    chai.request(server)
      .get('/api/application')
      .end(function(err, res){
        console.log(err)
        res.should.have.status(200);
        done();
      });
  });

  it('should list a SINGLE blob on /blob/<id> GET');
  it('should add a SINGLE blob on /blobs POST');
  it('should update a SINGLE blob on /blob/<id> PUT');
  it('should delete a SINGLE blob on /blob/<id> DELETE');

});

