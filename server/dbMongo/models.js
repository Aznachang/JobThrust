var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/companyView');


var mongoose = require('mongoose');

var interviewSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
    },
  name: String,
  companyComments: Array,
  imgUrl: String
});

var employeeSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
    },
  name: String,
  employeeComments: Array,
  imgUrl: String,
  helpfulButtonScore: String,
  userInfo: Array,
  singleUl: String
});

var EmployeeModel = mongoose.model('Employee', employeeSchema);
var InterviewModel = mongoose.model('Interview', interviewSchema);

module.exports.InterviewModel = InterviewModel;
module.exports.EmployeeModel = EmployeeModel;

