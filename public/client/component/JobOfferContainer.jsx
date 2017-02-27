import React from 'react';
import JobOfferForm from './JobOfferForm.jsx';
import Modal from 'react-modal';
import axios from 'axios';

export default class JobOfferContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobOffers: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.getOffers = this.getOffers.bind(this);
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
      var jobOffers = offers.data.sort(function(a, b) {
        return b.id - a.id;
      });
      context.setState({jobOffers: jobOffers});
      console.log('jobOffers: ', context.state.jobOffers);
    });
    // e.preventDefault();
  }

  componentDidMount() {
    // Get Existing Job Offers Upon First Load
    this.getOffers();
  }

  // <td><button onClick={context.props.openModal}>Offer</button></td>

  render() {
    var context = this;
    return (
      <div>
      <br/>
        <table>
          <thead>
            <tr className='application'>
              <th>Company</th>
              <th>Role</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>

          {this.state.jobOffers.map((jobOffer, index) =>

            <tr>
              <td>{jobOffer.companyName}</td>
              <td>{jobOffer.jobTitle}</td>

              <JobOfferForm getOffer={this.getOffers} updateOffer = {this.updateOffer} offerId ={jobOffer.id}/>
            </tr>
            )}
          </tbody>
        </table>

      </div>
    )
  }
}