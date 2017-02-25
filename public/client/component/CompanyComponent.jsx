import React from 'react';
import $ from 'jQuery';
import CompanyListComponent from './CompanyListComponent.jsx'
import CompanySearch from './CompanySearch.jsx'

export default class CompanyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyInfo: [],
      companyView: '',
      value: '',
      hidden: false
    }
    this.getCompanyInfo = this.getCompanyInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  show(){
    this.setState({hidden : true});
  }
  getCompanyInfo(event) {
    event.preventDefault();
    var context = this;
    this.show();
    console.log('this is the state value' ,this.state.value)
    $.ajax({
      method:'GET',
      url:'http://localhost:3000/api/company?company='+ this.state.value,
      contentType: 'application/json',
      success: function(data) {
        console.log('This glassdoor info', data)
        context.setState({
          companyInfo: data[0],
          companyView: data[1]
        })
      },
      error: function(error) {
        console.log(error);
      }
    })
  }
  handleChange(event) {
    // console.log(this.state.value)
    this.setState({value: event.target.value});
  }
  render() {
    return (
      <div>
        <CompanySearch getCompanyInfo={this.getCompanyInfo} handleChange={this.handleChange}/>
       <div>
       {this.state.hidden ? <CompanyListComponent companyInfo={[this.state.companyInfo[0]]} companyView={this.state.companyView}/> : null}
        </div>
        <div className="newDiv"></div>

      </div>
    )
  }
}