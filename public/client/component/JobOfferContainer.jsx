import React from 'react';
import JobOfferForm from './JobOfferForm.jsx';
import Modal from 'react-modal';
import axios from 'axios';

export default class JobOfferContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobOffers: [],
      checked: false
    };

    this.handleChecked = this.handleChecked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getOffers = this.getOffers.bind(this);
  }

  // toggle CheckMark
  handleChecked() {
    this.setState({checked: !this.state.checked});
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

  render() {
    var context = this;

    return (
      <div>
      <br/>
        <table>
          <thead>
            <tr className='application'>
              <th id ='compare-offer'>Compare</th>
              <th className ='offer-equal'>Company</th>
              <th className ='offer-equal'>Role</th>
              <th id ='update-offer'>Update</th>
            </tr>
          </thead>
          <tbody>

          {this.state.jobOffers.map((jobOffer, index) =>

            <tr className='application'>
              <td><input type = 'checkbox' onChange={this.handleChecked} defaultChecked = {this.state.checked} /></td>
              <td onClick={this.openModal}>{jobOffer.companyName}</td>
              <td onClick={this.openModal}>{jobOffer.jobTitle}</td>
              <JobOfferForm getOffer={this.getOffers} updateOffer = {this.updateOffer} offerId ={jobOffer.id} jobOffers = {jobOffer} isChecked={this.props.checked}/>
            </tr>
            )}
          </tbody>
        </table>

      </div>
    )
  }
}