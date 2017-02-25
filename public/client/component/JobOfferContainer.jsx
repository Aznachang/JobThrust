import React from 'react';
import JobOfferForm from './JobOfferForm.jsx';

export default class JobOfferContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: [],
      jobTitle: [],
      salary: [],
      signBonus: [],
      vacationDays: [],
      retireMatchPercent: [],
    };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  // Get Offers
  getOffers(event) {
    var context = this;
    axios.get('/api/application/offers')
    .then(function(response){
      console.log('Getting All Notes: ', response.data);
      context.setState({notes: response.data});
    });

    alert('An Job Offer Was Saved!');
    event.preventDefault();
  }

  //UPDATE A JOB OFFER
  updateOffer() {
    var context = this;

    axios.put('/api/application/offer', {
      note:$('.add-Note').val(),
      applicationId: context.props.appId
    }).then(function(notes) {
      context.getOffers();
      $('.add-Note').val('');
    });
  }

  componentDidMount() {
    // Get Existing Job Offers Upon First Load
    this.getOffers();
  }

  // <button onClick={this.addOffer} className='button-info create'>Add </button>

  render() {
    return (
      <div>
        <br/>
        <JobOfferForm getOffers={this.getOffers} updateOffer = {this.updateOffer}/>
      </div>
    )
  }
}