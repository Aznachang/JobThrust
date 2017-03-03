var auth = require('./auth');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(auth.googleAuth.clientID, auth.googleAuth.clientSecret, auth.googleAuth.callbackURL);
var calendar = google.calendar('v3');
var plus = google.plus('v1');
var gmail = google.gmail('v1');
var base64url = require('base64-url');
var createBody = require('./createEmailBody.js');
var btoa = require('btoa');
var threadsUtil = require('../utils/threads.js');

// Calendar Things

module.exports.oauth2C = oauth2Client;
module.exports.getPlusData = function(req, res) {
  return plus.people.get({userId: 'me', auth: module.exports.oauth2C}, function(err, response) {
    if (err) {
      console.log(err);
      res.sendStatus(401);
    }
    res.json(response);
  });
};

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
    }
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
      }
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
      res.sendStatus(400);
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

  if (req.body.email) {

    gmail.users.threads.list({
      userId: 'me',
      auth: module.exports.oauth2C,
      q: 'from:' + req.body.email
    }, function(err, threadsRes) {
      if (err) {
        res.sendStatus(401);
      }

      var pulledThreads = threadsRes.threads || [];
      var threadIds = pulledThreads.map(function(threadObj) {
        return threadObj.id;
      });

      gmail.users.threads.list({
        userId: 'me',
        auth: module.exports.oauth2C,
        q: 'to:' + req.body.email
      }, function(err, threadsRes) {
        if (threadsRes.threads) {
          threadsRes.threads.forEach(function(threadObj) {
            if (!threadIds.includes(threadObj.id)) {
              pulledThreads.push(threadObj);
            }
          });
        }

        threadsUtil.sortThreads(pulledThreads);

        var currentThread = 0;

        var threads = [];

        var getThreadEmails = function(index) {
          if (!pulledThreads[currentThread]) {
            res.json({'threads': threads});
            return;
          }



          console.log('Getting emails from thread:', pulledThreads[index]);
          gmail.users.threads.get({
            userId: 'me',
            auth: module.exports.oauth2C,
            id: pulledThreads[index].id,
            format: 'full'
          }, function(err, response) {
            if (err) {
              console.log('THREAD GET ERROR', err);
            }

            // threads[index] = response;  

            var messageArray = [];

            console.log('messages!!!!', response.messages);

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

        if (pulledThreads.length > 0) {
          getThreadEmails(currentThread);
        } else {
          res.json({'threads': []});
        }
      });

    });
    
  } else {
    res.json({'threads': []});
  }
}

module.exports.getMessage = function(req, res) {
  module.exports.oauth2C.setCredentials({
      access_token: module.exports.userTokens[req.session.passport.user],
      refresh_token: undefined
  });

  gmail.users.messages.get({
    userId: 'me',
    auth: module.exports.oauth2C,
    id: '15a91a7046a708bc',
    format: 'raw'
  }, function(err, response) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    res.json(parseBase64(response.raw));
  })
}

// var body = createBody({
//   headers: {
//     To: 'scott.mendall@gmail.com',
//     From: 'jfbriggs106@gmail.com',
//     Subject: 'This was rad, brother.'
//   },
//   textHtml: 'Thanks for last time, <b>buddy.</b>',
//   textPlain: 'Thanks for last time, *buddy.*',
//   // threadId: '1536195a8ad6a354',
//   attachments: [
//     // {
//     //   type: 'image/jpeg',
//     //   name: 'dog.jpg',
//     //   data: dogBase64
//     // },
//     // {
//     //   type: 'image/png',
//     //   data: catBase64
//     // }
//   ]
// })//.replace(/\+/g, '-').replace(/\//g, '_');

// var msgRaw = [
//   'Content-Type: multipart/related; boundary="foo_bar_baz"\n',
//   '--foo_bar_baz\n',
//   'Content-Type: application/json; charset=UTF-8]\n',
//   '{\n',
//   '  "threadId: "15a91a6d97637c0a"\n',
//   '}\n',
//   '--foo_bar_baz\n',
//   'Content-Type: message/rfc822\n',
//   'Content-Type: multipart/mixed; boundary="foo_bar"\n',
//   'In-Reply-To: <CANQQNRU9ex6DEq_vrpQ9xVYzBiHgEVqxU9RpFiWO=5YAFSgAbg@mail.gmail.com>\n',
//   'References: <CAC7Hkj7U3Aniu35piTKs01GmMaEDF4Bq2j8Af4b-+0Kag0kfeA@mail.gmail.com> <CANQQNRU9ex6DEq_vrpQ9xVYzBiHgEVqxU9RpFiWO=5YAFSgAbg@mail.gmail.com>\n',
//   'From: James Briggs <jfbriggs106@gmail.com>\n',
//   'To: Scott Mendall <scott.mendall@gmail.com>\n',
//   'Subject: Re: Yo bro\n',
//   '--foo_bar\n',
//   'Content-Type: text/html; charset="UTF-8"\n',
//   'MIME-Version: 1.0\n',
//   'Content-Transfer-Encoding: 7bit\n',
//   '<div dir="ltr">Hey man, just testing this</divxx>\n',
//   '--foo_bar--\n',
//   '--foo_bar_baz--'
// ].join('');

var simpleMsg = 'To: scott.mendall@gmail.com\r\nSubject: Hey there friend\r\nJust testing this';

var parseBase64 = function(code) {
  if (code) {
    return base64url.decode(code);
  } else {
    return '[No message body.]';
  }
}

function makeBody() {
    var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "In-Reply-To: <CANQQNRU9ex6DEq_vrpQ9xVYzBiHgEVqxU9RpFiWO=5YAFSgAbg@mail.gmail.com>\n",
        // "References: <CAC7Hkj7U3Aniu35piTKs01GmMaEDF4Bq2j8Af4b-+0Kag0kfeA@mail.gmail.com> <CANQQNRU9ex6DEq_vrpQ9xVYzBiHgEVqxU9RpFiWO=5YAFSgAbg@mail.gmail.com>\n",
        "to: Scott Mendall <scott.mendall@gmail.com>\n",
        "from: James Briggs <jfbriggs106@gmail.com>\n",
        "subject: Lets do some cool things\n\n",
        "Hey bud, whats going on with you today?"
    ].join('');

    var encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
    return encodedMail;
}


var messageRaw = makeBody();
// var rawm = makeBody('Scott Mendall <scott.mendall@gmail.com>', 'James Briggs <jfbriggs106@gmail.com>', 'test subject BRO', 'test message');

// var encodedMail = new Buffer(msgRaw).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
console.log(messageRaw);

module.exports.postMessage = function(req, res) {
  module.exports.oauth2C.setCredentials({
      access_token: module.exports.userTokens[req.session.passport.user],
      refresh_token: undefined
  });

  gmail.users.messages.send({
    userId: 'me',
    auth: module.exports.oauth2C,
    // threadId: '15a91a6d97637c0a',
    resource: {
      raw: messageRaw
    }

  }, function(err, response) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    console.log(response);
    res.json(response);
  })
}


