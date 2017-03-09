var axios = require('axios');

module.exports = {
  getSearches: function(req, res) {
    axios.get('http://localhost:4111/api/search/' + req.params.email).then(function(response) {
      console.log('EXTENDED SEARCH RESPONSE DATA:', response.data);
      res.json(response.data);
    }).catch(function(err) {
      res.sendStatus(401);
    });
  },

  deleteSearch: function(req, res) {
    axios.post('http://localhost:4111/api/delete', {searchId: req.body.searchId}).then(function(response) {
      res.sendStatus(200);
    }).catch(function(err) {
      res.sendStatus(401);
    });
  }


}