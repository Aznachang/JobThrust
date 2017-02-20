var router = require('express').Router();
var request = require('request');
var cheerio = require('cheerio');

router.route('/jobs/:query/:location').get(function(req, res) {
  console.log('GET JOBS QUERY: ', req.params.query);
  console.log(req.params.location)
  var url = 'http://www.monster.com/jobs/search/?q=' + req.params.query + '&where=' + req.params.location;
  console.log(url);
  request(url, function(error, response, html) {
    if(!error) {
    }
  })
});

module.exports = router;