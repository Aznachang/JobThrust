var Sequelize = require('sequelize');
var db = new Sequelize('jobseeker', 'root', '');

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
  full_time: Sequelize.STRING
});

var Company = db.define('company', {
  name: Sequelize.STRING,
  size: {type:Sequelize.STRING, allowNull: true}
});

var Stage = db.define('stage', {
  name: Sequelize.STRING
});

// User : Application (1 : M)
User.hasMany(Application);
Application.belongsTo(User);

// Job : Application (1 : M)
Application.belongsTo(Job);
Job.hasMany(Application);

// Stage : Application (1 : M)
Stage.hasMany(Application);
Application.hasOne(Stage);

User.create({
  id:'wqrewqtreytup',
  token: 'aaaaaaaa',
  email:'hello@gmail.com',
  name: 'Jawwad'
});

Job.create({
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