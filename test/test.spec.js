var expect = require('chai').expect;
var request = require('request');
var app = require('../server/server.js');
var server;
var db = require('../server/db/database');


describe("A test suite", function() {
  before(function() {
    server = app.listen(8000, function() {
      console.log('Shortly is listening on 3000');
    });
  });
   after(function() {
    server.close();
  });

  it('should insert data into the user table', function (done) {
    db.db.sync({force: true}).then(function() {

      db.User.create({
        id: 'sadfad0302',
        token: '02993943trkf',
        email: 'hello@gmail.com',
        name: 'Ahmed ZOooo'
      }).then(function(res) {
      })
    })
    done();
  });
  it('should insert data into the job table', function (done) {
    db.db.sync({force: true}).then(function() {

      db.Job.create({
        title: 'Full Stack Engineer',
        description: 'Full Stack Engineer',
        company: 'Facebook',
        key: 'kkkdsfasffffffff'
      }).then(function(res) {
      })
    })

    done();
  });
  it('should insert data into the job table', function (done) {
    db.db.sync({force: true}).then(function() {

      db.Application.create({
        userId: 1,
        jobId: 'sadfsadfsdf',
        stageId: 2,
        title: 'kkkdsfasffffffff'
      }).then(function(res) {
      })
    })

    done();
  });
  it('retrieve data from the job table', function (done) {
    db.Job.findAll().then(function(res) {
    })
    done();
  });
  it('retrieve data from the user table', function (done) {
    db.User.findAll().then(function(res) {
    })
    done();
  });
});