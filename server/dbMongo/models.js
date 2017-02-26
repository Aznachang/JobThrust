var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/companyView');


var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  gender: String,
  culture: String,
  born: String,
  died: String,
  titles: Array,
  aliases: Array,
  parent: Number,
  children: Array,
  allegiances: Array,
  books: Array,
  povBooks: Array,
  tvSeries: Array,
  playedBy: Array
});

var CharacterModel = mongoose.model('Character', characterSchema);
