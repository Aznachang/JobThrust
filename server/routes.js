var router = require('express').Router();
var request = require('request');
var cheerio = require('cheerio');
var axios = require('axios');
var path = require('path');
var table = require('./db/database');
var rp = require('request-promise');
<<<<<<< 147946b35d15eeff372e3ad68eb23e5c780e5911
var cal = require('./config/calendar');
=======
var InterviewModel = require('./dbMongo/models.js');

>>>>>>> already set up the mongodb

router.route('/jobs/:jk').get(function(req, res) {
  var url = "http://www.indeed.com/viewjob?jk=" + req.params.jk;
  request(url, function(error, response, html) {
    if(!error) {
      var $ = cheerio.load(html);
      // console.log($('#job_summary').text());
      var jobSummary = $('#job_summary').text() // A plain DOM element.
      res.send(jobSummary)
    }
  })
});

router.post('/interviewreview', function(req, res) {
  InterviewModel.insertMany(req.body, function(err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json('Data Was inserted successfully');
    }
  })
});

router.get('/interviewreview', function(req, res) {
  InterviewModel.find({}, function(err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  })
});

router.post('/goog/calget', cal.getCalData);

router.post('/goog/cal', cal.createEvent);


router.post('/job', function(req, res) {
  table.Job.findOrCreate({
    where: {
      key: req.body.key
    },
    defaults: {
      title: req.body.title,
      description: req.body.description || 'No snippet available.',
      fullDescription: req.body.fullDescription || 'No description available.',
      company: req.body.company
    }
  }).spread(function(job, created) {
    table.Application.create({
        jobId: job.dataValues.id,
        userId: req.session.passport.user,
        stageId: 0,
        title: req.body.title,
        company: req.body.company
    }).then(function(app) {
      res.sendStatus(200);
    });
  });
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
    {where: {id: req.body.applicationId}}
  ).then(function(thing) {
    res.sendStatus('200');
    console.log('Application stage updated');
  });
});

router.get('/user', function(req, res) {
  res.send(req.session.passport.user);
});

router.get('/company', function(req, res) {

  var basicUrl = 'http://api.glassdoor.com/api/api.htm?';
  var endpoints = 't.p=126535&t.k=jzi4LSmsrF5&userip=199.87.82.66&useragent=&format=json&v=1&action=employers&q=';

  rp(basicUrl+endpoints+req.query.company).then(function(respond) {
    respond = JSON.parse(respond)
    var url = 'https://en.wikipedia.org/wiki/';
    request(url+req.query.company, function(error, response, html) {
      if(!error) {
        var $ = cheerio.load(html);
        // console.log($('.infobox').text());
        var jobSummary = $('#mw-content-text').find('p').text() // A plain DOM element.
        // console.log(jobSummary)
        var index = jobSummary.match(/[.]/)['index'];
        res.json([respond.response.employers,jobSummary.slice(0,index+1)])
      }
    })
  }).catch(function(err) {

    console.log('There was an error with your request', err);
  })
});

router.get('/application', function(req, res) {
  table.Application.findAll({
  where: {
    userId: String(req.session.passport.user)
  }
  }).then(function(respond) {
    res.json(respond);
  })
});

/******
***      Routes for Notes with Specific Job Application
*******/
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

// POST or UPDATE a 'NOTE'
router.post('/application/notes', function(req, res) {
  // console.log(req.body);
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

router.post('/search', function(req, res) {
  table.Search.create(req.body)
  .then(function(response) {
    table.Query.create({
      searchId: response.dataValues.id,
      userId: req.session.passport.user,
    })
  })
})

router.route('/search/:id').get(function(req, res) {
  console.log('search/:id', req.params.id)
  table.Search.findAll({
    where: {
      id: Number(req.params.id)
    }
  }).then(function(search) {
    console.log(search);
    res.json(search);
  })
})

router.get('/query', function(req, res) {
  table.Query.findAll({
    where: {
      userId: req.session.passport.user
    }
  }).then(function(query) {
    res.json(query);
  })
})

/******
***      Routes for JOB OFFERS with Specific Job Application
*******/

// GET ALL 'JOB OFFERS'
router.get('/application/offers', function(req, res) {
  // Find All Notes For Specific Job Application ID#
  console.log('GETTING OFFERS!');
  table.Offer.findAll({
   where: {
     userId: req.session.passport.user
   }
  }).then(function(offers){
    res.json(offers);
  }); //end of Application then()
});

// 'POST' a 'JOB OFFER'
router.post('/application/offers', function(req, res) {
  //appId and jobId associated with that appId
  table.Job.findOne({
    where :{
      id: req.body.jobId
    }
  })
  .then(function(job){
    console.log('Job Record Found is: ', job);
    res.sendStatus('200');

    table.Offer.create({
      userId: req.session.passport.user,
      companyName: job.company,
      jobTitle: job.title,
      applicationId: req.body.applicationId
    }).then(function(offerCreated){
      res.sendStatus('200');
    });
  });
});

// 'UPDATE' a 'JOB OFFER' - /api/application/offers/1
router.put('/application/offers/:offerId', function(req, res) {
  console.log('POST A JOB OFFER: ', req.body);
  // See if this offer exists and is the CORRECT USER
  table.Offer.findOne({
    where: {
      id: req.params.offerId,
      userId: req.session.passport.user
    }
  }).then(function(offer){
    console.log('Updating Offer...')
    // res.sendStatus('200');
      // 'POST' Auto-Populates the 'companyName', 'jobTitle', 'applicationId'
    table.Offer.update({
      // Database Field: req.body.frontEnd
      salary: req.body.salary,
      signBonus: req.body.signBonus,
      vacationDays: req.body.vacationDays,
      retireMatchPercent: req.body.retireMatchPercent,
      // applicationId: req.body.applicationId
    },{
      where: {
        id: req.params.offerId,
        userId: req.session.passport.user
      }
    })
    .then(function(updatedOffer){
      console.log('Updated the Offer: ', updatedOffer);
      res.sendStatus('200');
    });
  });
});

// DELETE a 'JOB OFFER' (Maybe Need this????)
router.delete('/application/offers/:offerId', function(req, res){
  table.Offer.destroy({
    where: {
      id: req.params.offerId
    }
  }).then(function(deletedOffer){
    // SEND AN 'OK' to removeNote() - JobOfferContainer
    res.sendStatus('200');
  });
});

module.exports = router;