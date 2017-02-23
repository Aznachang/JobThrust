var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var routes = require('./routes');
var db = require('./db/database');
var passport = require('passport');
var session = require('express-session');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');


app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret: 'canihazjobspleasekthx', saveUninitialized: false,
    resave: false, maxAge:315360000 })); // session secret

require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('dev'));

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.get('/', function(req, res) {
  res.json('You are on the main page');
})
app.use('/api/', routes);
app.use(express.static(path.join(__dirname, '../public')));

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', {
          successRedirect : '/manage',
          failureRedirect : '/login'
  })
);


app.get('/auth/logout', function(req, res) {
  req.logout();
  req.session.destroy();
  console.log('LOGGED OUT');
  res.end();
});

function isLoggedIn (req, res, next) {
  if (req.url !== '/login') {
    if (req.session.passport) {
      next();
    } else {
      res.redirect('/login');
    }
  } else {
    next();
  }
}

// Ensures that front end routing applies
app.get('*', isLoggedIn, function (request, response){
  console.log(request.session);
  response.sendFile(path.resolve(__dirname, '../public', 'index.html'))
});

app.listen(3000, function() {
  console.log('You are on port 3000');
});
module.exports = app;
