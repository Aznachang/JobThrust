import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import SearchResultIcons from './SearchResultIcons.jsx';

class SearchResult extends React.Component {
  constructor(props){
    super(props);
  }

  render() {

    // Get Job Results With Page User is Currently On
    const renderJobResults = this.props.results.map((result, index) => {
      return (
        <li key={index} className="search-result" id={index}>
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
        <div>
          <ul>
            {renderJobResults}
          </ul>
        </div>
      );
  }
}

export default SearchResult;