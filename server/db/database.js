var Sequelize = require('sequelize');
var db = new Sequelize('jobseeker', 'postgres', 'r00tv3ggies', {
  dialect: "postgres",
  port: 8000
});

var User = db.define('user', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  token:Sequelize.STRING,
  email: Sequelize.STRING,
  name: Sequelize.STRING
});

var Job = db.define('job', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  company: Sequelize.STRING,
  key: {type: Sequelize.STRING, unique: true}
});

var Application = db.define('application', {
  jobId: Sequelize.INTEGER,
  userId: Sequelize.STRING,
  stageId: Sequelize.INTEGER,
  title: Sequelize.STRING
});

var Company = db.define('company', {
  name: Sequelize.STRING,
  size: {type:Sequelize.STRING, allowNull: true}
});

var Stage = db.define('stage', {
  name: Sequelize.STRING
});

var Note = db.define('note', {
  note: Sequelize.TEXT,
  applicationId: Sequelize.INTEGER
});

db.sync({force: true});

module.exports.User = User;
module.exports.Job = Job;
module.exports.Application = Application;
module.exports.Stage = Stage;
module.exports.Note = Note;
module.exports.db = db;