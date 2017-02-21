var router = require('express').Router();
var request = require('request');
var cheerio = require('cheerio');
var axios = require('axios');
var path = require('path');
var table = require('./db/database');

router.route('/jobs/:jk').get(function(req, res) {
  var url = "http://www.indeed.com/viewjob?jk=" + req.params.jk;
  request(url, function(error, response, html) {
    if(!error) {
      var $ = cheerio.load(html); 
      console.log($('#job_summary').text());
      var jobSummary = $('#job_summary').text() // A plain DOM element.
      res.send(jobSummary)
    }
  })
});

router.post('/job', function(req, res) {
    table.Job.create(req.body).then(function(res) {
      console.log('session', req.session)
      table.Application.create({
        jobId: res.dataValues.id,
        userId: req.session.passport.user,
        stageId: 0
      })
     })
  res.json(req.body.company);
})

router.get('/application', function(req, ress) {
  var jobs = [];

  table.Application.findAll({
  where: {
    userId: 1
  }
  }).then(function(res) {
    res.forEach(function(application, i) {
      table.Job.findAll({
        where: {
          id: application.jobId
        }
      }).then(function(respond) {
        jobs.push(respond)
        if (res.length-1 === i) {
            ress.send(jobs);
        }
        // console.log('jobs array', respond);
      })
    })
  })
})

module.exports = router;