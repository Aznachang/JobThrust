import React from 'react';
import ReactDOM from 'react-dom';


class SearchBar extends React.Component {
  constructor(props){
    super(props)
    
  }
//http://api.indeed.com/ads/apisearch?publisher=5024495540845813&q=software%20engineer&format=json&v=2
  render() {
    return (
    <form onSubmit={this.props.getJobs} className="job-search-form">
      <input type="text" name="search" placeholder="Job Title..." onChange={this.props.searchHandler} />
      <input type="text" name="location" placeholder="ZIP Code.." pattern="[0-9]{5}" onChange={this.props.searchHandler} />
      <input type="submit" value="Find Jobs" />
    </form>
    )  
  };
};

export default SearchBar;