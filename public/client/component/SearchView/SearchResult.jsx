import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import SearchResultIcons from './SearchResultIcons.jsx';
import $ from 'jQuery'

class SearchResult extends React.Component {
  constructor(props){
    super(props) 
  }

  render() {
    console.log('SearchResults in Result: ', this.props.results);
    var results = this.props.results;
    var resultsList = results.map((result, index) => {
      return (
        <li key={index} className="search-result">
          <SearchResultIcons index={index} addJob={this.props.addJob} removeJob={this.props.removeJob} result={result} />
          <div  onClick={this.props.openModal.bind(null, result.jobkey, index)}>
            <h3>{result.jobtitle}</h3>
            <h3>{result.company} ({result.formattedLocation})</h3>
            <p>{result.snippet.replace(/\//g,'').replace(/<b>/g, '')}</p>
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