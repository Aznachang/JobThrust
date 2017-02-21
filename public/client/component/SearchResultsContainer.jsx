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
        <SearchResult info={this.props.info} results={this.props.results} onClick={this.props.onClick}/>
      </div>
    )  
  }
}

export default SearchResultContainer;