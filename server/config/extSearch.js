var axios = require('axios');

module.exports = {
  getSearches: function(req, res) {
    axios.get('http://lowcost-env.a2uvfbnd4f.us-west-2.elasticbeanstalk.com/api/search/' + req.params.email).then(function(response) {
      console.log('EXTENDED SEARCH RESPONSE DATA:', response.data);
      res.json(response.data);
    }).catch(function(err) {
      res.sendStatus(401);
    });
  },

  deleteSearch: function(req, res) {
    axios.post('http://lowcost-env.a2uvfbnd4f.us-west-2.elasticbeanstalk.com/api/delete', {searchId: req.body.searchId}).then(function(response) {
      res.sendStatus(200);
    }).catch(function(err) {
      res.sendStatus(401);
    });
  },

  submitSearch: function(req, res) {
    axios.post('http://lowcost-env.a2uvfbnd4f.us-west-2.elasticbeanstalk.com/api/search', {
      city: req.body.city,
      title: req.body.title,
      email: req.body.email,
      label: req.body.label,
      key: 'Ap2jgr24poj2igjrowkagjwpajg;rkg;okagasoijgoago24igwj042gjaoirjgoiwajgaweijsoijvoasijvowirAB'
    }).then(function(response) {
      res.sendStatus(200);
    }).catch(function(err) {
      res.sendStatus(401);
    });
  }


}