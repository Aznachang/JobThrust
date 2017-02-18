var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var routes = require('./routes');
var db = require('./db/database');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
// app.use('/api', routes);
app.listen(8080, function() {
  console.log('You are on port 8080');
});