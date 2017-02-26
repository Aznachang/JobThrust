import React from 'react';
import JobOfferForm from './JobOfferForm.jsx';
import Modal from 'react-modal';
import axios from 'axios';

export default class JobOfferContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobOffers: []
      // companyName: [],
      // jobTitle: [],
      // salary: [],
      // signBonus: [],
      // vacationDays: [],
      // retireMatchPercent: [],
    };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  // Get Offers
  getOffers() {
    var context = this;
    axios.get('/api/application/offers')
    .then(function(offers){
      console.log('Getting All Job Offers: ', offers.data);
      context.setState({jobOffers: offers.data});
    });
    // e.preventDefault();
  }

  componentDidMount() {
    // Get Existing Job Offers Upon First Load
    this.getOffers();
  }

  render() {
    return (
      <div>
        <br/>
        <JobOfferForm getOffers={this.getOffers} updateOffer = {this.updateOffer}/>
      </div>
    )
  }
}