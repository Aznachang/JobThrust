import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import SearchResultIcons from './SearchResultIcons.jsx';
import $ from 'jQuery'

class SearchResult extends React.Component {
  constructor(props){
    super(props) 
  }

  render() {
    console.log('info: ', this.props.info);
    console.log('SearchResults in Result: ', this.props.results);
    var results = this.props.results;
    var resultsList = results.map((result, index) => {
      var infoWindow = null;
      if (this.props.info[index]) {
        infoWindow = <p>{this.props.info[index]}</p>
      } else {
        infoWindow = <button className="more-info-btn" onClick={this.props.onClick.bind(null, result.jobkey, index)}><span>More Info</span></button>
      }

      return (
        <li key={index} className="search-result">
          <div>
            <h3>{result.jobtitle}-{result.formattedLocation}<SearchResultIcons result={result} onClick={this.props.onClick.bind(null, result.jobkey, index)} /></h3>
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