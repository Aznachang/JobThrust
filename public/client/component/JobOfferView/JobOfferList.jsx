import React from 'react';
import Modal from 'react-modal';
import JobOfferForm from './JobOfferForm.jsx';
import JobOfferCompare from './JobOfferCompare.jsx';
import ArchivedJobOffer from './ArchivedJobOffer.jsx';
import axios from 'axios';

export default class JobOfferList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    }
  }

  render() {
    const offerList = this.props.jobOffers;
    const archivedOfferList = this.props.archivedOffers;

    /**** Get List of Filtered Job Offers - 1st Table ****/
    const filterJobOffers = offerList
      .filter(jobOffer => {
        //return only jobOffers whose 'companyName' matches with 'user serach input text'
        return jobOffer.companyName.toLowerCase().indexOf(this.props.filterText.toLowerCase()) >= 0
    }).map(jobOffer => {
      return (
        <tr className='application'>
         <td>{jobOffer.companyName}</td>
         <td>{jobOffer.jobTitle}</td>
         <JobOfferForm key ={jobOffer.id} index={jobOffer.id} getOffer={this.props.getOffer} offerId ={jobOffer.id} getArchivedJobOffers={this.props.getArchivedJobOffers}jobOffers = {jobOffer} />
       </tr>
      )
    });

    // <ArchivedJobOffer key ={archivedOffer.id} index={archivedOffer.id} getOffer={this.props.getOffer}  archivedOffers = {archivedOffer} getArchivedOffers={this.props.getArchivedOffers}/>

    /**** GET LIST OF ARCHIVED JOB OFFERS - 3rd Table ****/
    const filteredArchivedJobOffers = archivedOfferList
      .filter(archivedOffer => {
          //return only jobOffers whose 'companyName' matches with 'user serach input text'
          return archivedOffer.companyName.toLowerCase().indexOf(this.props.filterText.toLowerCase()) >= 0
      }).map(archivedOffer => {
        return (
          <ArchivedJobOffer convertDate={this.props.convertDate} archivedOffers = {archivedOffer} />
        )
      });

    /** Get List of Filtered Detailed Job Offers - 2nd Table **/
    const filterDetailedJobOffers = offerList
      .filter(jobOffer => {
        //return only jobOffers whose 'companyName' matches with 'user serach input text'
        return jobOffer.companyName.toLowerCase().indexOf(this.props.filterText.toLowerCase()) >= 0
    }).map(jobOffer => {
      return (
        <JobOfferCompare convertDate={this.props.convertDate} jobOffer = {jobOffer}/>
      )
    });
    /** CHECK FOR ARCHIVED JOB OFFERS **/
    return (
      <div id='JobOfferView'>
        <div className="add-app-manual">
          <div className='JobOffer'>
           <h2 id='Job-Table'>Job Offers List</h2>
            <table>
             <thead>
               <tr className='application'>
                 <th className ='offer-equal'>Company</th>
                 <th className ='offer-equal'>Role</th>
                 <th id ='update-offer'>Update</th>
               </tr>
             </thead>
             <tbody>
              {filterJobOffers}
             </tbody>
            </table>
          </div>
        </div>

        <div className="add-app-manual">
          <div className='JobOffer'>
            <h2 id='offer-breakdown'> Breakdown of Job Offers </h2>
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
                {filterDetailedJobOffers}
              </tbody>
            </table>
          </div>
        </div>

        <div className="add-app-manual">
          <div className='JobOffer'>
            <h2 id='offer-breakdown'> Archived Job Offers </h2>
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
                {filteredArchivedJobOffers}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    )
  }
};
