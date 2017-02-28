var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/companyView');


var mongoose = require('mongoose');

var interviewSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  companyComments: Array
});

var InterviewModel = mongoose.model('Interview', interviewSchema);
module.exports = InterviewModel;
