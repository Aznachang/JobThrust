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


var Application = db.define('application', {
  full_time: {type:Sequelize.STRING, allowNull: true}
});

var Company = db.define('company', {
  name: Sequelize.STRING,
  size: {type:Sequelize.STRING, allowNull: true}
});

var Stage = db.define('stage', {
  name: Sequelize.STRING
});

// Job : User (N : M ) --> 'Application' is the JOIN table
User.belongsToMany(Job, {through: Application});
Job.belongsToMany(User, {through: Application});

// Stage : Application (1 : M)
Stage.hasMany(Application);
Application.belongsTo(Stage);

var newUser = User.create({
  id:'wqrewqtreytup',
  token: 'aaaaaaaa',
  email:'hello@gmail.com',
  name: 'Jawwad'
});

var newJob = Job.create({
  title: 'Software Engineering-google',
  description: 'coder',
  full_time: true
});

Stage.sync();
Application.sync();
Company.sync();
User.sync();
Job.sync();

module.exports = db;