import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import SearchResultIcons from './SearchResultIcons.jsx';

class SearchResult extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    console.log('SearchResults in Result: ', this.props.results);
    var results = this.props.results;
    var resultsList = results.map((result, index) => {
      return (
        <li key={index}>
          <div>
            <h3>{result.jobtitle}-{result.formattedLocation}<SearchResultIcons /></h3>
            <h3>{result.company}</h3>
            <p>{result.snippet}</p>
          </div>
        </li>
      );
    })
    return (
      <ul>{resultsList}</ul>
    )  
  }
}

export default SearchResult;