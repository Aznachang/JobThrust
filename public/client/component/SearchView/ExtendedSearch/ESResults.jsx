import React from 'react';
import SearchResultIcons from '../SearchResultIcons.jsx';

export default class ESResults extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.results.length > 0) {
      return (
        <div className='ext-results-container'>
          <div className='ext-search-header'><h3>Search Results</h3></div>
          <div className='btn-container'>
            <div className='app-btn back-btn' onClick={this.props.backToSearches}>◀ Back</div>
          </div>
          <ul className='ext-search-results'>
            {this.props.results.map((result, i) =>
              <li className='search-result' key={i} onClick={this.props.viewJob.bind(null, i)}>
                <div className="buttons-div result-btn-div">
                  <div className="buttons-container">
                    <button className="result-btn select">✔ Interested</button>
                  </div>
                </div>
                <p>{result.title}</p>
                <p>{result.company} {result.location ? '(' + result.location + ')' : ''}</p>
              </li>
            )}
          </ul>
        </div>
      )
    } else {
      return (
        <div className='ext-results-container'>
          <div className='ext-search-header'><h3>Search Results</h3></div>
          <div className='btn-container'>
            <div className='app-btn back-btn' onClick={this.props.backToSearches}>◀ Back</div>
          </div>
          <div className='no-results'>No results found for this search.</div>
        </div>
      )
    }
  }
}