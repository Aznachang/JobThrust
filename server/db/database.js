var Sequelize = require('sequelize');
var db = new Sequelize('jobseeker', 'postgres', 'r00tv3ggies', {
  dialect: "postgres",
  port: 5432
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
  fullDescription: Sequelize.TEXT,
  company: Sequelize.STRING,
  key: {type: Sequelize.STRING, unique: true}
});

var Application = db.define('application', {
  jobId: Sequelize.INTEGER,
  userId: Sequelize.STRING,
  stageId: Sequelize.INTEGER,
  title: Sequelize.STRING,
  company: Sequelize.STRING,
  active: {type: Sequelize.BOOLEAN, defaultValue: true},
  activeReason: Sequelize.STRING
});

var Note = db.define('note', {
  note: Sequelize.TEXT,
  applicationId: Sequelize.INTEGER
});

var Search = db.define('search', {
  query: {type: Sequelize.STRING, unique: true}
})

var Query = db.define('query', {
  searchId: Sequelize.INTEGER,
  userId: Sequelize.STRING,
})

var Offer = db.define('offer', {
  userId: Sequelize.STRING,
  companyName: Sequelize.STRING,
  jobTitle: Sequelize.STRING,
  salary: {type:Sequelize.INTEGER, allowNull: true},
  signBonus: {type:Sequelize.INTEGER, allowNull: true},
  vacationDays: {type:Sequelize.INTEGER, allowNull: true},
  retireMatchPercent: {type:Sequelize.INTEGER, allowNull: true},
  active: {type: Sequelize.BOOLEAN, defaultValue: true},
  activeReason: {type: Sequelize.STRING, allowNull: true},
  applicationId: Sequelize.INTEGER
});

var PointOfContact = db.define('pointOfContact', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  applicationId: Sequelize.INTEGER
});

db.sync();

module.exports.User = User;
module.exports.Job = Job;
module.exports.Application = Application;
module.exports.Note = Note;
module.exports.Search = Search;
module.exports.Query = Query;
module.exports.Offer = Offer;
module.exports.PointOfContact = PointOfContact;
module.exports.db = db;
