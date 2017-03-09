var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./auth');
var google = require('googleapis');
var plus = google.plus('v1');
var calendar = google.calendar('v3');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(configAuth.googleAuth.clientID, configAuth.googleAuth.clientSecret, configAuth.googleAuth.callbackURL);

var db = require('../db/database.js');

var cal = require('./calendar');


module.exports = function(passport) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      db.User.findOne({where: {id: user.id}}).then(function(user) {
          done(null, user);
      }).error(function(err) {
        done(err, null);
      });
  });

  // =========================================================================
  // GOOGLE ==================================================================
  // =========================================================================

  passport.use(new GoogleStrategy({

      clientID        : configAuth.googleAuth.clientID,
      clientSecret    : configAuth.googleAuth.clientSecret,
      callbackURL     : configAuth.googleAuth.callbackURL,

  },
  function(token, refreshToken, profile, done) {

    cal.userTokens[profile.id] = {
      token: token,
      refreshToken: refreshToken
    }
    console.log('REFRESH TOKEN:', refreshToken);
    console.log('setting user token for', profile.id, 'as', token);

      // make the code asynchronous
      // User.findOne won't fire until we have all our data back from Google
      process.nextTick(function() {

          // try to find the user based on their google id
          db.User.findOne({where: { 'id' : profile.id }}).then(function(user) {
              if (user) {
                console.log('USER FOUND');

                  // if a user is found, log them in
                  return done(null, user);
              } else {
                console.log('USER NOT FOUND: CREATING');

                db.User.build({
                  // set all of the relevant information
                  id: profile.id,
                  token: token,
                  name: profile.displayName,
                  email: profile.emails[0].value // pull the first email
                  
                })
                  // save the user
                .save()
                .then(function(user) {
                  return done(null, user);
                })
                .catch(function(err) {
                  console.log(err);
                });
              }
          })
          .error(function(err) {
            return done(err);
          });
      });

  }));  

};