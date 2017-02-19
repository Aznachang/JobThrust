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
      results: []
    }
    this.getJobs = this.getJobs.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
  };

  getJobs(event) {
    console.log(event);
    event.preventDefault();
    var context = this;

    //JSONP request to bypass CORS HEADERS
    $.getJSON("http://api.indeed.com/ads/apisearch?callback=?", {
      publisher: '5024495540845813',
      l: this.state.location,
      q: this.state.search,
      format: 'json',
      v: '2'
    }, function(json){
      context.setState({results: json.results})
    });
  }

  stateHandler(event) {
    console.log('name: ', event.target.name, 'value: ', event.target.value);
    this.setState({[event.target.name]: event.target.value})
  }


  render() {
    return(
      <div>
       <SearchBar onSubmit={this.getJobs} onChange={this.stateHandler} />
       <Recommend recItems={['Software Engineering - Google', 'FrontEnd - Yahoo']}/>
       <SearchResultsContainer results={this.state.results}/>
      </div>
    )
  };
};