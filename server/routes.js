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

// router.get('/application', function(req, ress) {
//   var jobs = [];
//   console.log('-=-----', req.session.passport.user)
//   table.Application.findAll({
//   where: {
//     userId: String(req.session.passport.user)
//   }
//   }).then(function(res) {
//     res.forEach(function(application, i) {
//       table.Job.findAll({
//         where: {
//           id: application.jobId
//         }
//       }).then(function(respond) {
//         jobs.push(respond)
//         if (res.length-1 === i) {
//             ress.json(jobs);
//         }
//         // console.log('jobs array', respond);
//       })
//     })
//   })
// })

router.post('/application/stagechange', function(req, res) {
  console.log('Application post request:', req.body);
  table.Application.update(
    {stageId: req.body.stageId},
    {where: {id: req.body.id}}
  ).then(function(thing) {
    console.log('Application stage updated');
  });
});

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
// example '/api/application/1/note'
router.get('/application/:id/notes', function(req, res) {
  // Find All Notes where
  table.Note.findAll({
    where: {
      applicationId: req.params.id
    }
  }).then(function(notes){
    res.json(notes);
  })
});

router.post('/application/notes', function(req, res) {
  // See if this note exists
  table.Note.findOne({
    note: req.body.note,
    where: {
      applicationId: req.params.appId,
      id: req.params.noteId
    }
  }).then(function(note){
    // if note does not exist
    if (!note) {
      // Find All Notes where
      table.Note.create({
        note: req.body.name,
        applicationId: req.body.applicationId
      }).then(function(notes){
        console.log('A new note was created!');
        res.json(notes);
      })
      // update existing note
    } else {
      table.Note.update({
        note: req.body.note,
        where: {
          id: req.body.id
        }
      }).then(function(thing) {
        console.log('Note Got Updated');
      });
    }

  })
});

// // UPDATE 'note'
// router.put('/application/:appId/notes/:noteId', function(req, res) {
//   // Find and Update Specific Note where
//   table.Note.findOne({
//     note: req.body.note;
//     where: {
//       applicationId: req.params.appId,
//       id: req.params.noteId
//     }
//   }).then(function(notes){
//     res.json(notes);
//   })
// });

module.exports = router;