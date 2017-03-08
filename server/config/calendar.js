var auth = require('./auth');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(auth.googleAuth.clientID, auth.googleAuth.clientSecret, auth.googleAuth.callbackURL);
var calendar = google.calendar('v3');
var plus = google.plus('v1');
var gmail = google.gmail('v1');
var base64url = require('base64-url');
var threadsUtil = require('../utils/threads.js');

// Calendar Things

module.exports.oauth2C = oauth2Client;

module.exports.userTokens = {};

module.exports.getCalData = function(req, res) {
  module.exports.oauth2C.setCredentials({
      access_token: module.exports.userTokens[req.session.passport.user],
      refresh_token: undefined
  });

  var now = new Date();
  now = now.toISOString().substring(0, 19) + 'Z';

  var calData;

  calendar.events.list({
    auth: module.exports.oauth2C,
    calendarId: 'primary',
    timeMin: now,
    showDeleted: false,
    singleEvents: true,
    privateExtendedProperty: 'applicationId=' + req.body.id
  }, function(err, response) {
    if (err) {
      console.log(err);
      res.sendStatus(401);
    } else {
      calData = response.items;
      calendar.events.list({
        auth: module.exports.oauth2C,
        calendarId: 'primary',
        timeMin: now,
        showDeleted: false,
        singleEvents: true,
        q: 'APPID-' + req.body.id
      }, function(err, response) {
        if (err) {
          res.sendStatus(401);
        } else {
          response.items.forEach(function(item) {
            calData.push(item);
          });

          calData.sort(function(a, b) {
            return new Date(a.start.dateTime) - new Date(b.start.dateTime);
          });
          res.json({items: calData});         
        }
      });    
    }
  });
}

module.exports.createEvent = function(req, res) {
    calendar.events.insert({
    auth: module.exports.oauth2C,
    calendarId: 'primary',
    resource: req.body,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      res.sendStatus(401);
      return;
    } else {
      console.log('Event created: %s', event.htmlLink);
      res.sendStatus(200);
    }
  });
};

// GMail Things

module.exports.getThread = function(req, res) {
  module.exports.oauth2C.setCredentials({
      access_token: module.exports.userTokens[req.session.passport.user],
      refresh_token: undefined
  });

  if (req.body.email) {

    console.log('Checking FROM threads');

    gmail.users.threads.list({
      userId: 'me',
      auth: module.exports.oauth2C,
      q: 'from:' + req.body.email
    }, function(err, threadsRes) {
      if (err) {
        res.sendStatus(401);
      } else {
        var pulledThreads = threadsRes.threads || [];
        var threadIds = pulledThreads.map(function(threadObj) {
          return threadObj.id;
        });

        console.log('Checking for TO ONLY threads');

        gmail.users.threads.list({
          userId: 'me',
          auth: module.exports.oauth2C,
          q: 'to:' + req.body.email + ' from:jfbriggs106@gmail.com'
        }, function(err, threadsRes) {
          if (err) {
            console.log(err);
            res.sendStatus(401);
          } else {
            if (threadsRes.threads) {
              threadsRes.threads.forEach(function(threadObj) {
                if (!threadIds.includes(threadObj.id)) {
                  pulledThreads.push(threadObj);
                  threadIds.push(threadObj.id);
                }
              });
            }

            threadsUtil.sortThreads(threadIds);

            var currentThread = 0;

            var threads = [];

            var getThreadEmails = function(index) {
              if (!threadIds[currentThread]) {
                res.json({'threads': threads});
                return;
              }

              console.log('Getting emails from thread:', threadIds[index]);
              gmail.users.threads.get({
                userId: 'me',
                auth: module.exports.oauth2C,
                id: threadIds[index],
                format: 'full'
              }, function(err, response) {
                if (err) {
                  console.log('THREAD GET ERROR', err);
                } else {
                  // threads[index] = response;

                  var messageArray = [];

                  console.log('messages!!!!', response.messages);

                  response.messages.forEach(function(message, i) {
                    if (message.payload.headers.length === 12) {
                      for (var i = 0; i < message.payload.headers.length; i++) {
                        console.log('Header ' + i + ': ' + message.payload.headers[i].name, message.payload.headers[i].value );
                      }
                    }
                    console.log(i, message.payload.headers.length);

                    // Edits body text location based on whether there's an attachment or not
                    var msgComponents = {
                      'From': 'none',
                      'To': 'none',
                      'Subject': 'none',
                      'Date': 'none',
                      bodyData: null
                    }

                    if (message.payload.parts[0].parts) {
                      msgComponents.bodyData = parseBase64(message.payload.parts[0].parts[0].body.data).split(/[\r]/g);
                    } else {
                      msgComponents.bodyData = parseBase64(message.payload.parts[0].body.data).split(/[\r]/g);
                    }

                    message.payload.headers.forEach(function(header) {
                      if (msgComponents[header.name]) {
                        msgComponents[header.name] = header.value;
                      }
                    });
                    messageArray.push({
                      'from': msgComponents.From,
                      'to': msgComponents.To,
                      'sentAt': msgComponents.Date,
                      'subject': msgComponents.Subject,
                      'body': msgComponents.bodyData
                    });

                  });
                  
                }


                threads.unshift(messageArray);

                currentThread++;

                return getThreadEmails(currentThread);

              });


            }     
          }
          console.log('Running getThreadEmails!');

          if (pulledThreads.length > 0) {
            getThreadEmails(currentThread);
          } else {
            res.json({'threads': []});
          }
        });
      }
    });

  } else {
    res.json({'threads': []});
  }
}

var parseBase64 = function(string) {
  return base64url.decode(string);
}