import React from 'react';
import { browserHistory } from 'react-router';
import SearchBar from './SearchBar.jsx';
import SearchRecommendations from './SearchRecommendations.jsx';
import axios from 'axios'
import SearchResultsContainer from './SearchResultsContainer.jsx';
import $ from 'jQuery'

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      location: null,
      results: [],
      recommendations: [],
      info: {}
    }
    this.getJobs = this.getJobs.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.removeJob = this.removeJob.bind(this);
    this.addJob = this.addJob.bind(this);
    this.addSearch = this.addSearch.bind(this);
    this.getRecommendations = this.getRecommendations.bind(this);
    this.addRecommendation = this.addRecommendation.bind(this);
    this.removeRecommendation = this.removeRecommendation.bind(this);
  };

  // GET JOBS FROM INDEED API
  getJobs(event) {
    event.preventDefault();
    var context = this;
    //JSONP request to bypass CORS HEADERS
    $.getJSON("http://api.indeed.com/ads/apisearch?callback=?", {
      publisher: '5024495540845813', // TODO: HIDE THIS!!!
      l: context.state.location,
      q: context.state.search,
      limit: 25,
      format: 'json',
      v: '2'
    }, function(json){
      context.setState({
        results: json.results,
        info: {}
      });
      context.addSearch();
    });
  }

  // GET RECOMMENDATIONS BASED ON PREVIOUS SEARCHES
  getRecommendations() {
    var context = this;
    $.get("/api/query")
    .done(function(response) {
      $.get("api/search/" + response[0].searchId)
      .done(function(response) {
        $.getJSON("http://api.indeed.com/ads/apisearch?callback=?", {
          publisher: '5024495540845813', // TODO: HIDE THIS!!!
          l: context.state.location,
          q: response[0].query,
          limit: 5,
          format: 'json',
          v: '2'
        }, function(json){
          context.setState({
            recommendations: json.results,
            info: {}
          })
        })
      })
    })
  }

  //VIEW A RECOMMENDATION
  // getJobs(event) {
  //   event.preventDefault();
  //   var context = this;
  //   //JSONP request to bypass CORS HEADERS
  //   $.getJSON("http://api.indeed.com/ads/apisearch?callback=?", {
  //     publisher: '5024495540845813', // TODO: HIDE THIS!!!
  //     l: context.state.location,
  //     q: context.state.search,
  //     limit: 25,
  //     format: 'json',
  //     v: '2'
  //   }, function(json){
  //     context.setState({
  //       results: json.results,
  //       recommendations: [],
  //       info: {}
  //     });
  //     context.addSearch();
  //   });
  // }

  // ADD SEARCH AND QUERY TO DB
  addSearch() {
  // TODO SEE IF SEARCH EXIST PRIOR SO USER CAN STILL CREATE QUERY
    axios.post('/api/search', {
      query: this.state.search
    })
  }


  /**********SEARCH RESULT ICON FUNCTIONS**********/

  // ADD JOB TO DB
  addJob(result, index) {
    var context = this;
    axios.get('/api/jobs/' + result.jobkey).then(function(description) {
      axios.post('/api/job', {
        title: result.jobtitle,
        description: result.snippet,
        fullDescription: description.data,
        company: result.company,
        key: result.jobkey
      }).then(function() {
        context.state.results.splice(index, 1)
        context.setState({
          results: context.state.results,
          info: {}
        })
      })
    })
  }
  
  // REMOVE INDIVIDUAL JOB COMPONENT FROM VIEW (NOT DB)
  removeJob(jobIndex) {
    var context = this;
    context.state.results.splice(jobIndex, 1)
    context.setState({
      results: context.state.results,
      info: {}
    })  
  }


  // SCRAPE INFO FROM INDEED JOB AND SET IT AS STATE TO DISPLAY
  getInfo(jobkey, index) {
    var context = this;
    $.get("/api/jobs/" + jobkey)
    .done(function(response) {
      context.setState({
        info: {[index]: response}
      })
    })
  }

  /********************/

  /**********RECOMMENDATION ICON FUNCTIONS**********/

  // ADD JOB TO DB
  addRecommendation(result, index) {
    var context = this
    axios.post('/api/job', {
      title: result.jobtitle,
      description: result.snippet.replace(/\//g,'').replace(/<b>/g, ''),
      company: result.company,
      key: result.jobkey
    }).then(function() {
      context.state.recommendations.splice(index, 1)
      context.setState({
        recommendations: context.state.recommendations,
        info: {}
      })
    })
  }
  
  // REMOVE INDIVIDUAL JOB COMPONENT FROM VIEW (NOT DB)
  removeRecommendation(jobIndex) {
    var context = this;
    context.state.recommendations.splice(jobIndex, 1)
    context.setState({
      recommendations: context.state.recommendations,
      info: {}
    })  
  }


  // SCRAPE INFO FROM INDEED JOB AND SET IT AS STATE TO DISPLAY
  // getInfo(jobkey, index) {
  //   var context = this;
  //   $.get("/api/jobs/" + jobkey)
  //   .done(function(response) {
  //     context.setState({
  //       info: {[index]: response}
  //     })
  //   })
  // }

  /********************/

  // HANDLES STATE RELATED TO FORMS
  searchHandler(event) {
    this.setState({[event.target.name]: event.target.value})
  }



  componentWillMount() {
    this.getRecommendations();
  }

  render() {
    return(
      <div>
       <div className="page-header">Search For Current Openings</div>
       <SearchBar getJobs={this.getJobs} searchHandler={this.searchHandler} />
       <SearchRecommendations info={this.state.info} recommendations={this.state.recommendations} addRecommendation={this.addRecommendation} getInfo={this.getInfo} removeRecommendation={this.removeRecommendation} />
       <SearchResultsContainer info={this.state.info} results={this.state.results} addJob={this.addJob} getInfo={this.getInfo} removeJob={this.removeJob} />
      </div>
    )
  };
};