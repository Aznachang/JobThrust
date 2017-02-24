import React from 'react';
import { browserHistory } from 'react-router';
import SearchBar from './SearchBar.jsx';
import Recommend from './Recommend.jsx';
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
      info: {}
    }
    this.getJobs = this.getJobs.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.removeJob = this.removeJob.bind(this);
    this.addJob = this.addJob.bind(this);
  };

  // GET JOBS FROM INDEED API
  getJobs(event) {
    event.preventDefault();
    var context = this;
    //JSONP request to bypass CORS HEADERS
    $.getJSON("http://api.indeed.com/ads/apisearch?callback=?", {
      publisher: '5024495540845813', // TODO: HIDE THIS!!!
      l: this.state.location,
      q: this.state.search,
      format: 'json',
      v: '2'
    }, function(json){
      context.setState({
        results: json.results,
        info: {}
      });
    });
  }

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

  // HANDLES STATE RELATED TO FORMS
  searchHandler(event) {
    this.setState({[event.target.name]: event.target.value})
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

  render() {
    return(
      <div>
       <div className="page-header">Search For Current Openings</div>
       <SearchBar getJobs={this.getJobs} searchHandler={this.searchHandler} />
       <Recommend recItems={['Software Engineering - Google', 'FrontEnd - Yahoo']}/>
       <SearchResultsContainer info={this.state.info} results={this.state.results} addJob={this.addJob} getInfo={this.getInfo} removeJob={this.removeJob} />
      </div>
    )
  };
};