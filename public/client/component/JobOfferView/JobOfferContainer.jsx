import React from 'react';
import JobOfferList from './JobOfferList.jsx';
import Modal from 'react-modal';
import axios from 'axios';

export default class JobOfferContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobOffers: [],
    };

    this.handleChecked = this.handleChecked.bind(this);
    this.addCheckedOffers = this.addCheckedOffers.bind(this);
    this.getOffers = this.getOffers.bind(this);
  }

  // toggle CheckMark
  handleChecked() {
    var context = this;

    this.setState({checked: !this.state.checked});
    if (this.state.checked) {
      context.addCheckedOffers();
    }
  }

  addCheckedOffers() {
    var context = this;

  }

  // Get Offers
  getOffers() {

    var context = this;
    axios.get('/api/application/offers')
    .then(function(offers){
      console.log('Getting All Job Offers: ', offers.data);
      var jobOffers = offers.data.sort(function(a, b) {
        return b.id - a.id;
      });
      context.setState({jobOffers: jobOffers});
      console.log('jobOffers: ', context.state.jobOffers);
    });
    // e.preventDefault();
  }

  renderOfferCompare() {
    console.log('renderOfferCompare!');
    console.log(this.state.jobOffers);
    return (
      <div className='JobOffer'>
        <table>
            <thead>
              <tr>
                <th>Application</th>
                <th>Salary</th>
                <th>Signing Bonus</th>
                <th>Vacation Days</th>
                <th> 401K Company Match</th>
              </tr>
            </thead>
            <tbody>
            {this.state.jobOffers.map((jobOffer, index) =>
              <tr>
                <td>{jobOffer.companyName} - {jobOffer.jobTitle}</td>
                <td>${jobOffer.salary}</td>
                <td>${jobOffer.signBonus}</td>
                <td>{jobOffer.vacationDays}</td>
                <td>{jobOffer.retireMatchPercent}%</td>
              </tr>
              )}
            </tbody>
        </table>
      </div>
    )
  }

  componentDidMount() {
    // Get Existing Job Offers Upon First Load
    this.getOffers();
  }

  render() {
    return (
      <div>
        <JobOfferList getOffer={this.getOffers} handleChecked = {this.handleChecked} isChecked={this.handleChecked} compareOffers= {this.renderOfferCompare} jobOffers = {this.state.jobOffers}/>

      </div>
    )
  }
}