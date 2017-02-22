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
      var infoWindow = null;
      if (this.props.info[index]) {
        infoWindow = <p>{this.props.info[index]}</p>
      } else {
        infoWindow = <br />
      }

      return (
        <li key={index} className="search-result">
          <div>
            <h3>{result.jobtitle}-{result.formattedLocation}<SearchResultIcons index={index} addJob={this.props.addJob} removeJob={this.props.removeJob} result={result} getInfo={this.props.getInfo.bind(null, result.jobkey, index)} /></h3>
            <h3>{result.company}</h3>
            <p>{result.snippet}</p>
            {infoWindow}
            
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