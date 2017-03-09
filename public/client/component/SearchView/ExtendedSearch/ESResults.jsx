import React from 'react';
import SearchResultIcons from '../SearchResultIcons.jsx';
import axios from 'axios';

export default class ESResults extends React.Component {

  constructor(props) {
    super(props);
    this.addJob = this.addJob.bind(this);
  }

  addJob(i) {
    var context = this;

    var appData = {
      title: this.props.results[i].title,
      company: this.props.results[i].company,
      city: this.props.results[i].location,
      state: '',
      fullDescription: 'View posting at URL: ' + this.props.results[i].link,
      key: 'EXTSEARCH-' + Math.round(Math.random() * 156202252523133562534)
    }

    axios.post('/api/job', appData).then(function(res) {
      alert(context.props.results[i].title + ' (' + context.props.results[i].company + ') added to your pipeline!');
    });
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
              <li className='search-result' key={i}>
                <div className="buttons-div result-btn-div">
                  <div className="buttons-container">
                    <button className="result-btn select" onClick={this.addJob.bind(null, i)}>✔ Interested</button>
                  </div>
                </div>
                <div onClick={this.props.viewJob.bind(null, i)}>
                  <p>{result.title}</p>
                  <p>{result.company} {result.location ? '(' + result.location + ')' : ''}</p>
                </div>
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