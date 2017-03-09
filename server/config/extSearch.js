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
  },

  submitSearch: function(req, res) {
    axios.post('http://localhost:4111/api/search', {
      city: req.body.city,
      title: req.body.title,
      email: req.body.email,
      label: req.body.label,
      key: 'Ap2jgrawAB@R(@r903bur3b3bABFiabojosabij2r02bjrwabWABIFJBAWIBwjooeijsoijvoasijvowirAB'
    }).then(function(response) {
      res.sendStatus(200);
    }).catch(function(err) {
      res.sendStatus(401);
    });
  }


}