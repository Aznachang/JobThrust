import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import SearchResultIcons from './SearchResultIcons.jsx';

class SearchResult extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentPage: 1,
      resultsPerPage: 10
    }
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  // Pagination Click Handler
  handlePageClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const results = this.props.results;
    const context = this;

    /** DISPLAY CURRENT JOB RESULTS with RESPECTIVE PAGE # **/
    const indexOfLastResultPage = this.state.currentPage * this.state.resultsPerPage;
    const indexOfFirstResultPage = indexOfLastResultPage - this.state.resultsPerPage;
    const currentJobResults = results.slice(indexOfFirstResultPage, indexOfLastResultPage);

    /** display page Numbers **/
    const pageNumbers = [];
    // ex: Math.ceil (25 / 10) --> Math.ceil(2.5) --> 1 2 3
    for (let i = 1; i <= Math.ceil(results.length / this.state.resultsPerPage); i++){
      pageNumbers.push(i);
    }

    // Render Page Numbers
    const renderPageNumbers = pageNumbers.map(number => {
        return (
          <li
            key={number}
            id={number}
            onClick={this.handlePageClick}
          >
            {number}
          </li>
        );
      });

    // Get Job Results With Page User is Currently On
    const renderJobResults = currentJobResults.map((result, index) => {
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
          <ul id="page-numbers">
            {renderPageNumbers}
          </ul>
        </div>
      );
  }
}

export default SearchResult;