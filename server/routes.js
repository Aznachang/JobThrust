var router = require('express').Router();
var request = require('request');
var cheerio = require('cheerio');
var axios = require('axios');
var path = require('path');
var table = require('./db/database');
var rp = require('request-promise');
var cal = require('./config/calendar');
var extSearch = require('./config/extSearch');
var Model = require('./dbMongo/models.js');
var multer = require('multer');
var AWS= require('aws-sdk');

var fs = require('fs');

var S3FS = require('s3fs');

var s3fsImpl = new S3FS('uploadImages92',{
    accessKeyId:'AKIAIQ5IYO2XWIF3LKVA',
    secretAccessKey:'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',
    ACL: 'public-read'
});

// Create our bucket if it doesn't exist
s3fsImpl.create();

var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();

router.use(multipartyMiddleware);
router.get('/upload',function(req, res) {
  Model.UploadFiles.find({
    userId: req.session.passport ? req.session.passport.user : req.headers['job-thrust-native']
  } ,function(err, data) {
    if (!err) {
      // console.log('This what was in DB', data);
      res.send(data);
    }
  })
})
router.post('/upload',function(req, res) {
    var file = req.files;

   var stream = fs.createReadStream(file.fileUpload.path);

   var name = file.fileUpload.originalFilename.slice(0, file.fileUpload.originalFilename.length-4).replace(/[^a-zA-Z]/g,'');

   if (file.fileUpload.originalFilename.split('.')[1] === 'pdf' || file.fileUpload.originalFilename.split('.')[1] === 'PDF') {

     return s3fsImpl.writeFile(name, stream, {"ContentType":"application/pdf"}).then(function(data) {
          fs.unlink(file.fileUpload.path, function(err){
              console.error(err);
              var fsImplStyles = s3fsImpl.getPath(file.fileUpload.originalFilename);

              console.log('This is the path for the image in s3 amazon Web', fsImplStyles);

              var createS3Url = 'https://s3.amazonaws.com/uploadImages92/' + name;
              var uploadObj = {id: Math.floor(Math.random() * 100000), imgeUrl: createS3Url, userId: req.session.passport ? req.session.passport.user : req.headers['job-thrust-native'], name:file.fileUpload.originalFilename}
              Model.UploadFiles.insertMany(uploadObj, function(err, data) {
                if (err) {
                  res.send(err);
                } else {
                  res.send('Hi');
                }
              })
          })
      });
   } else if (file.fileUpload.originalFilename.split('.')[1] === 'png' || file.fileUpload.originalFilename.split('.')[1] === 'jpg') {
         return s3fsImpl.writeFile(name, stream, {"ContentType":"image/png"}).then(function(data) {
          fs.unlink(file.fileUpload.path, function(err){
              console.error(err);
              var fsImplStyles = s3fsImpl.getPath(file.fileUpload.originalFilename);

              var createS3Url = 'https://s3.amazonaws.com/uploadImages92/' + name
              var uploadObj = {id: Math.floor(Math.random() * 100000), imgeUrl: createS3Url, userId: req.session.passport ? req.session.passport.user : req.headers['job-thrust-native'], name:file.fileUpload.originalFilename}
              Model.UploadFiles.insertMany(uploadObj, function(err, data) {
                if (err) {
                  res.send(err);
                } else {
                  res.send('Hi');
                }
              })
          })
      });
   }
});

/******************* Upload Files ends********************/
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

/******************* Company component ********************/

router.post('/employeeReviews', function(req, res) {
  var insertObj = req.body;
  insertObj.userId = req.session.passport.user;
  Model.EmployeeModel.insertMany(req.body, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send('Data Was inserted successfully');
    }
  })
});

router.post('/interviewreview', function(req, res) {
  var insertObj = req.body;
  insertObj.userId = req.session.passport.user;
  Model.InterviewModel.insertMany(insertObj, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send('Data Was inserted successfully');
    }
  })
});

router.get('/buttonsInfoForInterview', function(req, res) {
  Model.InterviewModel.find({
    id:Number(req.query.name)
  }, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
});

router.get('/buttonsInfo', function(req, res) {
  Model.EmployeeModel.find({
    id:Number(req.query.name)
  }, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
});

router.get('/employeeReviews', function(req, res) {
  Model.EmployeeModel.find({
    name:req.query.name
  }, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
});

router.post('/updateHelpfulButtonForInterview', function(req, res) {
  Model.InterviewModel.findOne({id:req.body[1]}, function(err, doc) {
    for (var i = 0; i < doc.userInfo.length; i++) {
      if (JSON.stringify(doc.userInfo[i]) !== JSON.stringify(req.body[2])) {
        doc.userInfo.push(req.body[2]);
      }
    }
    if (doc.userInfo.length === 0) {
      doc.userInfo.push(req.body[2]);
    }
    doc.helpfulButtonScore = req.body[0];
    doc.singleUl = req.body[3]
    doc.save();
    res.send('');
  })
});

router.post('/updateHelpfulButton', function(req, res) {
  Model.EmployeeModel.findOne({id:req.body[1]}, function(err, doc) {
    for (var i = 0; i < doc.userInfo.length; i++) {
      console.log(JSON.stringify(doc.userInfo[i]) === JSON.stringify(req.body[2]))
      if (JSON.stringify(doc.userInfo[i]) !== JSON.stringify(req.body[2])) {
        doc.userInfo.push(req.body[2]);
      }
    }
    if (doc.userInfo.length === 0) {
      doc.userInfo.push(req.body[2]);
    }
    doc.helpfulButtonScore = req.body[0];
    doc.singleUl = req.body[3]
    doc.save();
    res.send('');
  })
});

router.post('/updateEmployeeReview', function(req, res) {
  Model.EmployeeModel.findOne({id:req.body[1]}, function(err, doc) {
    doc.countOfReviews = req.body[2];
    doc.employeeComments = req.body[0];
    doc.save();
    res.send('');
  })
});

router.post('/updateMongoDB', function(req, res) {

  Model.InterviewModel.findOne({id:req.body[1]}, function(err, doc) {
    doc.name = req.body[0].name;
    doc.countOfReviews = req.body[0].countOfReviews;
    var company = [
      {
        "jobTitle" : req.body[0].companyComments[0].jobTitle
      },
      {
        "date" : req.body[0].companyComments[1].date
      },
      {
        "interviewProcess" : {
          "interviewQuestion" : req.body[0].companyComments[2].interviewProcess.interviewQuestion,
          "descriptionOfinterview" : req.body[0].companyComments[2].interviewProcess.descriptionOfinterview
        }
      }
    ];
    doc.companyComments = company;
    doc.save();
    res.send('');
  })
});

router.get('/interviewreview', function(req, res) {
  Model.InterviewModel.find({
    name:req.query.name
  }, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
});

// === GOOGLE API ROUTES ===
router.post('/goog/calget', cal.getCalData);

router.post('/goog/cal', cal.createEvent);

router.post('/mail/thread/', cal.getThread);
// ====

// ==== BACKGROUND SEARCH ROUTS ===

router.get('/extsearch/:email/', extSearch.getSearches);

router.post('/extsearch/delete', extSearch.deleteSearch);

router.post('/extsearch/add', extSearch.submitSearch);

// ====


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
        userId: req.session.passport ? req.session.passport.user : req.headers['job-thrust-native'],
        stageId: 0,
        title: req.body.title,
        company: req.body.company
    }).then(function(app) {
      table.PointOfContact.create({
        name: '',
        email: '',
        phone: '',
        applicationId: app.id
      }).then(function(contact) {
        res.sendStatus(200);

      });
    });
  });
});

router.get('/job/:jobId', function(req, res) {
  table.Job.findOne({
    where: {id: req.params.jobId}
  }).then(function(jobinfo) {
    res.send(jobinfo);
  });
})

router.post('/application/stagechange', function(req, res) {
  table.Application.update(
    {stageId: req.body.stageId},
    {where: {id: req.body.applicationId}}
  ).then(function(thing) {  
    res.sendStatus('200');
  });
});

router.get('/user', function(req, res) {
  res.send(req.session.passport ? req.session.passport.user : req.headers['job-thrust-native']);
});

router.get('/userdata', function(req, res) {
  table.User.findOne({
    where: {
      id: req.session.passport ? req.session.passport.user : req.headers['job-thrust-native']
    }
  }).then(function(data) {
    res.send(data);
  });
})

router.get('/company', function(req, res) {
  var basicUrl = 'http://api.glassdoor.com/api/api.htm?';
  var endpoints = 't.p=126535&t.k=jzi4LSmsrF5&userip=199.87.82.66&useragent=&format=json&v=1&action=employers&q=';
  rp(basicUrl+endpoints+req.query.company).then(function(respond) {

    respond = JSON.parse(respond);

    res.send([respond.response.employers, req.session.passport ? req.session.passport.user : req.headers['job-thrust-native']])
  }).catch(function(err) {

    console.log('There was an error with your request', err);
  })
});

// 'GET' - ALL JOB APPS to a SPECIFIC GOOGLE USER
router.get('/application', function(req, res) {
  table.Application.findAll({
  where: {
    userId: String(req.session.passport ? req.session.passport.user : req.headers['job-thrust-native'])
  }
  }).then(function(respond) {
    res.send(respond);
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
    res.send(notes);
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
      table.Note.create({
        note: req.body.note,
        applicationId: req.body.applicationId
      }).then(function(notes){
        res.send(notes);
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
      userId: req.session.passport ? req.session.passport.user : req.headers['job-thrust-native'],
    })
  })
})

router.get('/contact/:appId', function(req, res) {
  table.PointOfContact.findOrCreate({
    where: {
      applicationId: req.params.appId
    },
    defaults: {
      name: '',
      email: '',
      phone: ''
    }
  }).spread(function(contactInfo, created) {
    if (created) {
    }
    res.send(contactInfo);
  });
})

router.post('/contact/', function(req, res) {
  table.PointOfContact.update(
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    },
    {where: {applicationId: req.body.appId}}
  ).then(function(contactInfo) {
    res.sendStatus(200);
  });
})

router.route('/search/:id').get(function(req, res) {
  table.Search.findAll({
    where: {
      id: Number(req.params.id)
    }
  }).then(function(search) {
    res.send(search);
  })
})

router.get('/query', function(req, res) {
  table.Query.findAll({
    where: {
      userId: req.session.passport ? req.session.passport.user : req.headers['job-thrust-native']
    }
  }).then(function(query) {
    res.send(query);
  })
})

/******
***      Routes for JOB OFFERS with Specific Job Application
*******/

// GET ALL 'JOB OFFERS'
router.get('/application/offers', function(req, res) {
  // Find All Notes For Specific Job Application ID#
  table.Offer.findAll({
   where: {
     userId: req.session.passport ? req.session.passport.user : req.headers['job-thrust-native']
   }
  }).then(function(offers){
    res.send(offers);
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
    // res.sendStatus(200);

    table.Offer.create({
      userId: req.session.passport ? req.session.passport.user : req.headers['job-thrust-native'],
      companyName: job.company,
      jobTitle: job.title,
      applicationId: req.body.applicationId
    }).then(function(offerCreated) {
        res.sendStatus(200);
      });
  });
});

// 'UPDATE' A JOB RECORD FROM JOB APPLICATION VIEW --> ARCHIVE
router.put('/application/:appId', function(req, res) {

  table.Application.update({
    active: false,
    activeReason: req.body.activeReason
  },{
    where: {
      id: req.params.appId,
      userId: req.session.passport ? req.session.passport.user : req.headers['job-thrust-native']
    }
  })
  .then(function(archiveJob) {
    res.sendStatus(200);
  });
});

// DELETE ALL APPLICATIONS FOR A USER - JUST FOR DEVELOPMENT

router.get('/deleteapps', function(req, res) {
  var user = req.session.passport ? req.session.passport.user : req.headers['job-thrust-native']; 
  table.Application.destroy({
    where: {
      userId: user
    }
  }).then(function() {
    res.send('All application data for user ' + user + ' deleted successfully.');
  });
});

// 'UPDATE' Specific Job Offer --> 'ARCHIVE'
router.put('/application/:appId/offer/:offerId', function(req, res) {
  // console.log('POST A JOB OFFER: ', req.body);
  table.Offer.update({
    active: req.body.active,
    activeReason: req.body.activeReason
  },{
    where: {
      id: req.params.offerId,
      userId: req.session.passport ? req.session.passport.user : req.headers['job-thrust-native']
    }
  })
  .then(function(archivedOffer){
    if (req.body.active === false) {

      table.Application.update(
       {
         active: false,
         activeReason: req.body.activeReason
       },
       {
         where: {
         id: req.params.appId
       }
      }).then(function(thing) {
        res.sendStatus(200);
      })
    } else {
      res.sendStatus(200);
    }
  });
});

// 'UPDATE' a 'JOB OFFER' CONTRACT DETAILS
router.put('/application/offers/:offerId', function(req, res) {
  // See if this offer exists and is the CORRECT USER
  table.Offer.update({
    salary: req.body.salary,
    signBonus: req.body.signBonus,
    vacationDays: req.body.vacationDays,
    retireMatchPercent: req.body.retireMatchPercent,
  },{
    where: {
      id: req.params.offerId,
      userId: req.session.passport ? req.session.passport.user : req.headers['job-thrust-native']
    }
  })
  .then(function(updatedOffer){
    // console.log('Updated the Offer: ', updatedOffer);
    res.sendStatus('200');
  });
});

// DELETE a 'JOB OFFER'
router.delete('/application/offers/:offerId', function(req, res){
  table.Offer.destroy({
    where: {
      id: req.params.offerId
    }
  }).then(function(deletedOffer){
    // SEND AN 'OK' to removeNote() - JobOfferContainer
    res.sendStatus(200);
  });
});

module.exports = router;