import React from 'react';
import JobOfferForm from './JobOfferForm.jsx';
export default class JobOfferList extends React.Component {

  constructor(props) {
    super(props);
    this.renderCompareOffers = this.renderCompareOffers.bind(this);
  }

  renderCompareOffers() {
    return this.props.compareOffers();
  }

  componentDidMount(){
    this.props.getOffer();
  }

  render() {
    return (
      <div id='JobOfferView'>
        <div id='Job-Offer'>
         <br/>
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
               <td onClick={this.openModal}>{jobOffer.companyName}</td>
               <td onClick={this.openModal}>{jobOffer.jobTitle}</td>
               <JobOfferForm key ={index} index={index} getOffer={this.props.getOffer} offerId ={jobOffer.id} jobOffers = {jobOffer} isChecked={this.props.isChecked}/>
             </tr>
             )}
           </tbody>
          </table>
        </div>
        <br/>
       <div className='JobOffer'>
          <table>
              <thead>
                <tr>
                  <th id='app-header'>Application</th>
                  <th id='salary-header'>Salary</th>
                  <th id='signBonus-header'>Signing Bonus</th>
                  <th id='vacation-header'>Vacation Days</th>
                  <th id='retire-header'> 401K Match</th>
                </tr>
              </thead>
              <tbody>
              {this.props.jobOffers.map((jobOffer, index) =>
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
      </div>
    )
  }
};

