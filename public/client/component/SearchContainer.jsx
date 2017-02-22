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
      info: {0: "Can I get this??"}
    }
    this.getJobs = this.getJobs.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.getInfo = this.getInfo.bind(this);
  };

  getJobs(event) {
    console.log(event);
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
      context.setState({results: json.results});
    });
  }

  searchHandler(event) {
    this.setState({[event.target.name]: event.target.value})
  }

   getInfo(jobkey, index) {
    var context = this;
    $.get("/api/jobs/" + jobkey)
    .done(function(response) {
      context.setState({info: {[index]: response}})
    })
  }

  render() {
    return(
      <div>
       <div className="page-header">
         Search For Current Openings
       </div>
       <SearchBar onSubmit={this.getJobs} onChange={this.searchHandler} />
       <Recommend recItems={['Software Engineering - Google', 'FrontEnd - Yahoo']}/>
       <SearchResultsContainer info={this.state.info} results={this.state.results} onClick={this.getInfo}/>
      </div>
    )
  };
};