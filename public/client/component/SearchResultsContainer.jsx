import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import SearchResult from './SearchResult.jsx';

class SearchResultContainer extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    //recursively render results
    return (
      <div>
        <div className="search-results-header">Search Results</div>
        <SearchResult info={this.props.info} results={this.props.results} addJob={this.props.addJob} getInfo={this.props.getInfo} removeJob={this.props.removeJob} />
      </div>
    )  
  }
}

export default SearchResultContainer;