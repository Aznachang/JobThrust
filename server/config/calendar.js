var auth = require('./auth');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(auth.googleAuth.clientID, auth.googleAuth.clientSecret, auth.googleAuth.callbackURL);
var calendar = google.calendar('v3');
var plus = google.plus('v1');
var gmail = google.gmail('v1');
var base64url = require('base64-url');

// Calendar Things

module.exports.oauth2C = oauth2Client;
module.exports.getPlusData = function(req, res) {
  return plus.people.get({userId: 'me', auth: module.exports.oauth2C}, function(err, response) {
    console.log('G+ DATA:', res);
    res.json(response);
  });
};

module.exports.userTokens = {};

module.exports.getCalData = function(req, res) {
  module.exports.oauth2C.setCredentials({
      access_token: module.exports.userTokens[req.session.passport.user],
      refresh_token: undefined
  });

  console.log('CALENDAR DATA REQUESTED:');

  var now = new Date();
  now = now.toISOString().substring(0, 19) + 'Z';
  console.log(now);
  console.log(typeof now);

  var calData;

  calendar.events.list({
    auth: module.exports.oauth2C,
    calendarId: 'primary',
    timeMin: now,
    showDeleted: false,
    singleEvents: true,
    privateExtendedProperty: 'applicationId=' + req.body.id
  }, function(err, response) {
    console.log('CAL DATA 1', response);
    calData = response.items;
    calendar.events.list({
      auth: module.exports.oauth2C,
      calendarId: 'primary',
      timeMin: now,
      showDeleted: false,
      singleEvents: true,
      q: 'APPID-' + req.body.id
    }, function(err, response) {
      console.log('SECOND RESPONSE', response);
      response.items.forEach(function(item) {
        calData.push(item);
      });

      calData.sort(function(a, b) {
        return new Date(a.start.dateTime) - new Date(b.start.dateTime);
      });

      res.json({items: calData});
      
    });
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
      return;
    }
    console.log('Event created: %s', event.htmlLink);
    res.sendStatus(200);
  });
};

// GMail Things

module.exports.getThread = function(req, res) {
  module.exports.oauth2C.setCredentials({
      access_token: module.exports.userTokens[req.session.passport.user],
      refresh_token: undefined
  });

  gmail.users.threads.list({
    userId: 'me',
    auth: module.exports.oauth2C,
    q: 'from:' + req.body.email
  }, function(err, threadsRes) {

    console.log('THE THREADS:', threadsRes);

    var currentThread = 0;

    var threads = [];

    console.log('just above inner function');
    var getThreadEmails = function(index) {
      if (!threadsRes.threads[index]) {
        res.json({'threads': threads});
        return;
      }

      console.log('Getting emails from thread:', threadsRes.threads[index]);
      gmail.users.threads.get({
        userId: 'me',
        auth: module.exports.oauth2C,
        id: threadsRes.threads[index].id,
        format: 'full'
      }, function(err, response) {
        if (err) {
          console.log('THREAD GET ERROR', err);
        }

        // threads[index] = response;  

        var messageArray = [];

        response.messages.forEach(function(message, i) {
          if (i === 0) {
            if (message.payload.headers.length > 11) { // if the initial message came from someone else
              messageArray.push({
                'from': message.payload.headers[14].value,
                'to': message.payload.headers[18].value,
                'sentAt': message.payload.headers[15].value,
                'subject': message.payload.headers[17].value,
                'body': parseBase64(message.payload.parts[0].body.data).split(/[\r]/g)
              });
            } else { // if the initial message in the thread was sent by me
              messageArray.push({
                'from': message.payload.headers[6].value,
                'to': message.payload.headers[7].value,
                'sentAt': message.payload.headers[2].value,
                'subject': message.payload.headers[5].value,
                'body': parseBase64(message.payload.parts[0].body.data).split(/[\r]/g)
              });
            }
          } else {
            if (message.payload.headers.length > 11) {
              messageArray.push({
                'from': message.payload.headers[16].value,
                'to': message.payload.headers[20].value,
                'inReplyTo': message.payload.headers[14].value,
                'sentAt': message.payload.headers[17].value,
                'subject': message.payload.headers[19].value,
                'body': parseBase64(message.payload.parts[0].body.data).split(/[\r]/g)
              });
            } else {
              messageArray.push({
                'from': message.payload.headers[8].value,
                'to': message.payload.headers[9].value,
                'inReplyTo': message.payload.headers[2].value,
                'sentAt': message.payload.headers[4].value,
                'subject': message.payload.headers[7].value,
                'body': parseBase64(message.payload.parts[0].body.data).split(/[\r]/g)
              });
            }
          }
        });

        threads.unshift(messageArray);

        currentThread++;

        return getThreadEmails(currentThread);

      });

      
    }
    console.log('Running getThreadEmails!');
    getThreadEmails(currentThread);

  });

}

var parseBase64 = function(code) {
  if (code) {
    return base64url.decode(code);
  } else {
    return '';
  }
}

