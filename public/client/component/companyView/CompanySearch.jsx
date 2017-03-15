import React from 'react';
import ReactDOM from 'react-dom';


export default class CompanySearch extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
       <form className="job-search-form" onSubmit={this.props.getCompanyInfo}>
         <input type="text" name="search" placeholder="Search company name..." onChange={this.props.handleChange} required/>
         <input type="submit" value="Find" />
        </form>
    )
  }
}
