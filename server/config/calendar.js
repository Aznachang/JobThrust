var auth = require('./auth');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(auth.googleAuth.clientID, auth.googleAuth.clientSecret, auth.googleAuth.callbackURL);
var calendar = google.calendar('v3');
var plus = google.plus('v1');

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