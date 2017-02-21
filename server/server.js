var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var routes = require('./routes');
var db = require('./db/database');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');


app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret: 'canihazjobspleasekthx' })); // session secret

require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('dev'));

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/', routes);
app.use(express.static(path.join(__dirname, '../public')));

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', {
          successRedirect : '/',
          failureRedirect : '/login'
  })
);


app.get('/logout', function(req, res) {
  req.logout();
  console.log('LOGGED OUT');
  res.redirect('/');
});


// Ensures that front end routing applies
app.get('*', function (request, response){
  console.log(request);
  response.sendFile(path.resolve(__dirname, '../public', 'index.html'))
});

app.listen(3000, function() {
  console.log('You are on port 3000');
});