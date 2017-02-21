var Sequelize = require('sequelize');
var db = new Sequelize('jobseeker', null, null, {
  dialect: "postgres",
  port: 5432
});

var User = db.define('user', {
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  token:Sequelize.STRING,
  email: Sequelize.STRING,
  name: Sequelize.STRING
});

var Job = db.define('job', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  companyName: Sequelize.STRING,
  stage: Sequelize.INTEGER
});

var Application = db.define('application', {
  jobId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  stageId: Sequelize.INTEGER
});

var Company = db.define('company', {
  name: Sequelize.STRING,
  size: {type:Sequelize.STRING, allowNull: true}
});

var Stage = db.define('stage', {
  name: Sequelize.STRING
});

module.exports.User = User;
module.exports.Job = Job;
module.exports.Application = Application;
module.exports.Stage = Stage;
module.exports.db = db;