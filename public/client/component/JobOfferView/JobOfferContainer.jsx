import React from 'react';
import JobOfferList from './JobOfferList.jsx';
import JobOfferSearchFilter from './JobOfferSearchFilter.jsx';
import Modal from 'react-modal';
import axios from 'axios';

export default class JobOfferContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobOffers: [],
      archivedJobOffers: [],
      filterText: ''
    };

    this.getOffers = this.getOffers.bind(this);
    this.handleUserOfferSearch = this.handleUserOfferSearch.bind(this);
    this.getArchivedJobOffers = this.getArchivedJobOffers.bind(this);
  }

  // Filter Job Offer Text - Event Handler
  handleUserOfferSearch(filterText) {
    this.setState({filterText: filterText});
  };

  convertDate(date) {
    // 2017-02-28T11:30:00-08:00
    console.log('Converting', date);
    var month = date.substring(5, 7);
    var day = date.substring(8, 10);
    var year = date.substring(0, 4);
    var timeHour = date.substring(11, 13);
    var timeMin = date.substring(14, 16);

    var amPm = 'AM';

    if (+timeHour > 11) {
      amPm = 'PM';
      timeHour = (+timeHour - 12).toString();
    }

    // Make Sure it is '12' and not '00'
    if (timeHour === '00') {
      timeHour = '12';
    }

    return month + '/' + day + '/' + year + ', ' + timeHour + ':' + timeMin + ' ' + amPm;
  }

  // Get Archived Job Offers
  getArchivedJobOffers() {
    var context = this;

    axios.get('/api/application/offers')
    .then(function(archivedOffers){
      // get list of [archivedJobOffers]
      var archivedJobOffers = archivedOffers.data
        .filter(archivedOffer => {
          // insert conditional statement
          return archivedOffer.active === false;
        });

      console.log('Archived Job Offers: ', archivedJobOffers);

      var sortedArchivedJobOffers = archivedJobOffers.sort(function(a, b) {
        return b.id - a.id;
      });

      context.setState({archivedJobOffers: sortedArchivedJobOffers});
      console.log('jobOffers: ', context.state.archivedJobOffers);
    });
  }

  // Get Job Offers
  getOffers() {
    var context = this;

    axios.get('/api/application/offers')
    .then(function(offers){
      console.log('Getting All Job Offers: ', offers.data);
      var jobOffers = offers.data.filter(offer => {
        return offer.active === true;
      });

      var sortedJobOffers = jobOffers.sort(function(a, b) {
        return b.id - a.id;
      });

      context.setState({jobOffers: sortedJobOffers});
      // console.log('getOffers - Job Offers: ', context.state.jobOffers);
    });
    // e.preventDefault();
  }

  componentDidMount() {
    // Get Existing Job Offers Upon First Load
    this.getOffers();
    // Get Archived Job Offers
    this.getArchivedJobOffers();
  }

  render() {
    return (
      <div>
        <JobOfferSearchFilter filterText={this.state.filterText} onUserInput={this.handleUserOfferSearch}/>
        <JobOfferList convertDate={this.convertDate} getOffer={this.getOffers} getArchivedJobOffers = {this.getArchivedJobOffers} jobOffers = {this.state.jobOffers} archivedOffers={this.state.archivedJobOffers} filterText={this.state.filterText}/>
      </div>
    )
  }
}