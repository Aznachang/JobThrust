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
    this.props.addSearch(this.refs['ext-title'].value, this.refs['ext-city'].value, this.refs['ext-label'].value);
    this.refs['ext-title'].value = '';
    this.refs['ext-city'].value = '';
    this.refs['ext-label'].value = '';
    this.setState({creating: false});
  }

  render() {

    var searchInstructions;

    if (this.props.searches.length === 0) {
      searchInstructions = <div className='ext-instructions'><p>It looks like you don't have any saved background searches yet.  To get started, click "Create New Search" above.  Fill in the fields, and the JobThrust background search will attempt to surface relevant openings for you.</p><p>It will notify you via e-mail when it's done, and you can find the saved results here!</p></div>;
    } else {
      searchInstructions = <div></div>;
    }

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
                  <input type='text' name='city' ref='ext-label' />
                </div>
              </div>
              <div className='ext-btn-container'>
                <div className='app-btn cal-btn' onClick={this.toggleCreate}>Cancel</div>
                <div className='app-btn cal-btn' onClick={this.submitSearch}>Initiate</div>
              </div>
            </form>
          </div>
          <ul className='saved-searches'>
            {this.props.searches.map((search, i) =>
              <li className='search-result' key={i}>
                <div className="buttons-div">
                  <div className="buttons-container">
                    <button className="result-btn remove" onClick={this.props.deleteSearch.bind(null, this.props.searches[i]['_id'])}>✘ Delete</button>
                  </div>
                </div>
                <div onClick={this.props.selectResults.bind(null, i)}>
                  <p>{search.label}</p>
                </div>
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
          {searchInstructions}
          <ul className='saved-searches'>
            {this.props.searches.map((search, i) =>
              <li className='search-result' key={i}>
                <div className="buttons-div">
                  <div className="buttons-container">
                    <button className="result-btn remove" onClick={this.props.deleteSearch.bind(null, this.props.searches[i]['_id'])}>✘ Delete</button>
                  </div>
                </div>
                <div onClick={this.props.selectResults.bind(null, i)}>
                  <p>{search.label}</p>
                </div>
              </li>
            )}
          </ul>
        </div>
      )
    }
  }
}