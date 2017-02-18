var Sequelize = require('sequelize');
var db = new Sequelize('jobseeker', null, null, {
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
//creates a corresponding table for that model, sync function cannot update tables. only creates if not exists
//force:true deletes the table completely and recreates a new table with new updates

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

db.sync({force:true});

module.exports = db;