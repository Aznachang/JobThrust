var router = require('express').Router();
var request = require('request');
var cheerio = require('cheerio');
var axios = require('axios');
var path = require('path');
var table = require('./db/database');
var rp = require('request-promise');


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
  console.log('----------------', req.body)
    table.Job.create(req.body).then(function(res) {
      console.log('session', req.session)
      table.Application.create({
        jobId: res.dataValues.id,
        userId: req.session.passport.user,
        stageId: 0,
        title: req.body.title +' ' +'-' +' '+req.body.company
      })
     }).then(function() {

       res.json(req.body.company);
     })
});

router.get('/job/:jobId', function(req, res) {
  table.Job.findOne({
    where: {id: req.params.jobId}
  }).then(function(jobinfo) {
    res.json(jobinfo);
  });
})

router.post('/application/stagechange', function(req, res) {
  console.log('Application post request:', req.body);
  table.Application.update(
    {stageId: req.body.stageId},
    {where: {id: req.body.id}}
  ).then(function(thing) {
    console.log('Application stage updated');
  });
});

router.get('/company', function(req, res) {

  var basicUrl = 'http://api.glassdoor.com/api/api.htm?';
  var endpoints = 't.p=126535&t.k=jzi4LSmsrF5&userip=199.87.82.66&useragent=&format=json&v=1&action=employers&q=';

  rp(basicUrl+endpoints+req.query.company).then(function(respond) {
    respond = JSON.parse(respond)
    console.log('-------********',respond)
    res.json(respond.response.employers)
  }).catch(function(err) {

    console.log('There was an error with your request', err);
  })
})
router.get('/application', function(req, res) {
  console.log('-=-----', req.session.passport.user)
  table.Application.findAll({
  where: {
    userId: String(req.session.passport.user)
  }
  }).then(function(respond) {
    res.json(respond);
  })
})

// Routes for Notes with Specific Job Application
router.get('/application/:id/notes', function(req, res) {
  // Find All Notes For Specific Job Application ID#
  table.Note.findAll({
    where: {
      applicationId: req.params.id
    }
  }).then(function(notes){
    res.json(notes);
  })
});

router.post('/application/notes', function(req, res) {
  console.log(req.body);
  // See if this note exists
  table.Note.findOne({
    where: {
      id: req.body.id
    }
  }).then(function(note){
    // if note does not exist
    if (!note) {
      // Find All Notes where
      console.log('NOTE DOES NOT EXIST YET!');
      table.Note.create({
        note: req.body.note,
        applicationId: req.body.applicationId
      }).then(function(notes){
        console.log('A new note was created!');
        res.json(notes);
      })
      // update existing note
    } else {
      table.Note.update(
      {note: req.body.note},
        {where: {
          id: req.body.id
        }
      }).then(function(thing) {
        // SEND AN 'OK' to updateNote() - NoteContainer
        res.sendStatus('200');
      });
    }

  })
});

// DELETE a 'NOTE'
router.delete('/application/notes/:noteId', function(req, res){
  table.Note.destroy({
    where: {
      // applicationId: req.params.appId,
      id: req.params.noteId
    }
  }).then(function(deletedNote){
    // SEND AN 'OK' to removeNote() - NoteContainer
    res.sendStatus('200');
  });
});

module.exports = router;