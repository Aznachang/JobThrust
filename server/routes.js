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

router.post('/', function(req, res) {
    table.Job.create({
      title: obj.job,
      description: 'Temp',
      companyName: obj.company,
      stage: obj.stage
    }).then(function(res) {
      table.Application.create({
        jobId: res.id,
        userId: 1,
        stageId: 1
      })
     })
  res.json('Hi');
})

router.get('/hello', function(req, ress) {
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