import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import SearchResultIcons from './SearchResultIcons.jsx';

class SearchResult extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <span>
          <h3>{jobName}</h3>
          <SearchResultIcons />
        </span>
        <div>{description}</div>
      </div>
    )  
  }
}

export default SearchResult;