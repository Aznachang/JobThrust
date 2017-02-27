import React from 'react';
import ReactDOM from 'react-dom';


export default class CompanySearch extends React.Component {
  constructor(props) {
    console.log(props)
    super(props);
  }
  render() {
    return (
       <form className="job-search-form" onSubmit={this.props.getCompanyInfo}>
         <input type="text" name="search" placeholder="Company Name.." onChange={this.props.handleChange}/>
         <input type="submit" value="Find" />
        </form>
    )
  }
}
