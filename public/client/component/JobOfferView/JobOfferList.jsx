import React from 'react';
import Modal from 'react-modal';
import JobOfferForm from './JobOfferForm.jsx';
import NoteContainer from '../NoteView/NoteContainer.jsx';
import JobOfferCompare from './JobOfferCompare.jsx';
import axios from 'axios';

export default class JobOfferList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    }
  }

  render() {
    // var context = this;
    return (
      <div id='JobOfferView'>
        <div id='Job-Offer'>
         <br/>
         <h2 id='Job-Table'>Job Offers List</h2>
          <table>
           <thead>
             <tr className='application'>
               <th id ='compare-offer'>Interested</th>
               <th className ='offer-equal'>Company</th>
               <th className ='offer-equal'>Role</th>
               <th id ='update-offer'>Update</th>
             </tr>
           </thead>
           <tbody>
           {this.props.jobOffers.map((jobOffer, index) =>
             <tr className='application'>
               <td><input key = {index}   type = 'checkbox' onChange={this.props.handleChecked} defaultChecked = {this.props.isChecked} value={jobOffer}/></td>
               <td>{jobOffer.companyName}</td>
               <td>{jobOffer.jobTitle}</td>
               <JobOfferForm key ={index} index={index} getOffer={this.props.getOffer} offerId ={jobOffer.id} jobOffers = {jobOffer} isChecked={this.props.isChecked}/>
             </tr>
             )}
           </tbody>
          </table>
        </div>

        <br/>

        <div className="add-app-manual">
          <div className='JobOffer'>
            <h3 id='offer-breakdown'> Breakdown of Job Offers </h3>
            <table>
              <thead>
                <tr>
                  <th id='app-header'>Application</th>
                  <th id='salary-header'>Salary</th>
                  <th id='signBonus-header'>Signing Bonus</th>
                  <th id='vacation-header'>Vacation Days</th>
                  <th id='retire-header'> 401K Match</th>
                  <th id='benefits'>Notes</th>
                </tr>
              </thead>
              <tbody>
              {this.props.jobOffers.map((jobOffer, index) =>
                <JobOfferCompare jobOffer = {jobOffer}/>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    )
  }
};
