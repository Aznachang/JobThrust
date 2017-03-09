import React from 'react';

export default class ESSearches extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      creating: false
    }

    this.toggleCreate = this.toggleCreate.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  toggleCreate() {
    if (this.state.creating) {
      this.setState({creating: false});
    } else {
      this.setState({creating: true});
    }
  }

  submitSearch() {

  }

  render() {
    if (this.state.creating) {
      return (
        <div className='ext-searches-container'>
          <div className='ext-search-header'><h3>Your Searches</h3></div>
          <div className='add-ext-search'>
            <form>
              <div id='ext-search-form'>
                <div>
                  <p>Title:</p>
                  <input type='text' name='title' ref='ext-title' />
                </div>
                <div>
                  <p>City:</p>
                  <input type='text' name='city' ref='ext-city' />
                </div>
                <div>
                  <p>Name Your Search:</p>
                  <input type='text' name='city' ref='ext-city' />
                </div>
              </div>
              <div className='ext-btn-container'>
                <div className='app-btn cal-btn' onClick={this.toggleCreate}>Cancel</div>
                <div className='app-btn cal-btn'>Initiate</div>
              </div>
            </form>
          </div>
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
    } else {
      return (
        <div className='ext-searches-container'>
          <div className='ext-search-header'><h3>Your Searches</h3></div>
          <div className='add-ext-search'>
            <div className='add-app-btn' onClick={this.toggleCreate}>CREATE NEW SEARCH</div>
          </div>
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
}