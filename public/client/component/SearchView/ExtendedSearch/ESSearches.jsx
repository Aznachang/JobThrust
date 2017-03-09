import React from 'react';

export default class ESSearches extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='ext-searches-container'>
        <div className='ext-search-header'><h3>Saved Searches</h3></div>
        <ul className='saved-searches'>
          {this.props.searches.map((search, i) =>
            <li className='search-result' key={i} onClick={this.props.selectResults.bind(null, i)}>
              <div className="buttons-div">
                <div className="buttons-container">
                  <button className="result-btn remove" onClick={this.props.deleteSearch.bind(null, this.props.searches[i]['_id'])}>✘ Delete</button>
                </div>
              </div>
              <p>{search.label}</p>
            </li>
          )}
        </ul>
      </div>
    )
  }
}