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
  imgUrl: String,
  helpfulButtonScore: String,
  userInfo: Array,
  singleUl: String,
  countOfReviews: String

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
  singleUl: String,
  countOfReviews: String
});

var uploadFiles = mongoose.Schema({
  id: {
    type: Number,
    unique: true
    },
  imgeUrl: String
});

var UploadFiles = mongoose.model('Upload', uploadFiles);

var EmployeeModel = mongoose.model('Employee', employeeSchema);
var InterviewModel = mongoose.model('Interview', interviewSchema);

module.exports.UploadFiles = UploadFiles;
module.exports.InterviewModel = InterviewModel;
module.exports.EmployeeModel = EmployeeModel;

