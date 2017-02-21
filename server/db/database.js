var Sequelize = require('sequelize');
var db = new Sequelize('jobseeker', 'postgres', 'r00tv3ggies', {
  dialect: "postgres",
  port: 5432
});

var User = db.define('user', {
  id: {type:Sequelize.STRING, primaryKey: true},
  token:Sequelize.STRING,
  email: Sequelize.STRING,
  name: Sequelize.STRING
});

var Job = db.define('job', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  full_time: Sequelize.BOOLEAN
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

db.sync();

module.exports = {
  User: User
};