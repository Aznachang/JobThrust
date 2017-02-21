var router = require('express').Router();
var request = require('request');
var cheerio = require('cheerio');
var axios = require('axios')

// router.route('/jobs/:query/:location').get(function(req, res) {
//   console.log('GET JOBS QUERY: ', req.params.query);
//   console.log(req.params.location)
//   var url = 'http://www.monster.com/jobs/search/?q=' + req.params.query + '&where=' + req.params.location;
//   console.log(url);
//   request(url, function(error, response, html) {
//     if(!error) {
//     }
//   })
// });

router.route('/jobs/:jk').get(function(req, res) {
  var url = "http://www.indeed.com/viewjob?jk=" + req.params.jk;
  console.log(url);
  request(url, function(error, response, html) {
    if(!error) {
    console.log('HEREEEEE')
      var $ = cheerio.load(html); 
      console.log($('#job_summary').text());
      var jobSummary = $('#job_summary').text() // A plain DOM element.
      res.send(jobSummary)
    }
  })
});

module.exports = router;