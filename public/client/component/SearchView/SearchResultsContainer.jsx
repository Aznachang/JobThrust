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
        <div className='page-control'>
          <div id='prev-page' onClick={this.props.prevPage}>Previous Page</div>
          <div id='current-page-num'>{this.props.currPage}</div>
          <div id='next-page' onClick={this.props.nextPage}>Next Page</div>
        </div>
        <SearchResult openModal={this.props.openModal} info={this.props.info} results={this.props.results} addJob={this.props.addJob} removeJob={this.props.removeJob} />
      </div>
    )
  }
}

export default SearchResultContainer;