import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import $ from 'jQuery';

// EACH Detailed Job Offer & Update Form
export default class JobOfferForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        modalIsOpen: false,
        user: '',
      }

      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.submitJobOffer = this.submitJobOffer.bind(this);
      this.submitArchiveJob = this.submitArchiveJob.bind(this);
    }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    var context = this;
    axios.get('/api/user').then(function(res) {
      context.setState({ user: res.data });
      console.log('USER:', res.data);
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  //UPDATE A JOB OFFER
  submitJobOffer(e) {
    e.preventDefault();
    var context = this;

    var jobOfferData = {
      salary: this.refs.salary.value,
      signBonus: this.refs.signBonus.value,
      vacationDays: this.refs.vacationDays.value,
      retireMatchPercent: this.refs.retireMatchPercent.value
    };

    axios.put('/api/application/offers/'+ this.props.offerId, jobOfferData)
    .then(function(offers) {
      context.props.getOffer();
      context.props.getArchivedJobOffers();
    });

    this.closeModal();
  }

  //UPDATE A JOB OFFER
  submitArchiveJob(e) {
    e.preventDefault();
    var context = this;
    var archiveOfferData = {
      active: false,
      activeReason: $("#archive-offer option:selected").text()
    };

    axios.put('/api/application/' + context.props.jobOffers.applicationId + '/offer/' + context.props.offerId, archiveOfferData)
    .then(function(jobOffer) {
      context.props.getOffer();
      context.props.getArchivedJobOffers();
    })

    this.closeModal();
  }

  render() {
    return (
      <tr>
       <td>{this.props.jobOffers.jobTitle}</td>
       <td>{this.props.jobOffers.companyName}</td>
       <td onClick={this.openModal}><span className='offer-click-icon'>📂</span></td>
        <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Example Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
        >

        <div className="inner-container">
          <h2>{this.props.jobOffers.companyName} - {this.props.jobOffers.jobTitle} </h2>

            <div className='add-app-container'>
              <div className='desc-header'>
                <b> Offer Details </b>
              </div>
              <table id='job-offer'>
                <tbody>
                    <tr>
                      <td><b>Salary ($): </b></td>
                      <td>{this.props.jobOffers.salary}</td>
                    </tr>
                    <tr>
                      <td><b>Signing Bonus ($): </b></td>
                      <td>{this.props.jobOffers.signBonus}</td>
                    </tr>
                    <tr>
                      <td><b>Vacation Days: </b></td>
                      <td>{this.props.jobOffers.vacationDays}</td>
                    </tr>
                    <tr>
                      <td><b>401K Company Match %: </b></td>
                      <td>{this.props.jobOffers.retireMatchPercent}</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className='offer-detail-container'>
            <div className='desc-header'>
              <b> Update Offer </b>
            </div>
            <form id="archive-offer-form" onSubmit={this.submitJobOffer}>
              <div className='form-box'>
                <div>
                  Salary<br />
                  <input type='text' name='salary' ref='salary' placeholder='50000' defaultValue={this.props.jobOffers.salary}/><br />
                </div>
                <div>
                  Signing Bonus<br />
                  <input type='text' name='signBonus' ref='signBonus' placeholder='5000' defaultValue = {this.props.jobOffers.signBonus} /><br />
                </div>
              </div>
              <div className='form-box'>
                <div>
                  Vacation Days<br />
                  <input type='text' name='vacationDays' ref='vacationDays' placeholder='14' defaultValue = {this.props.jobOffers.vacationDays}/><br />
                </div>
                <div>
                  401K Company Match %<br />
                  <input type='text' name='retireMatchPercent' ref='retireMatchPercent' placeholder='5' defaultValue = {this.props.jobOffers.retireMatchPercent}/><br />
                </div>
              </div>
              <div>
                <input type='submit' value='Add' /> <br />
              </div>
            </form>
          </div>

          <div className='add-app-container'>
            <div className='desc-header'>
              <b> Archive Offer </b>
            </div>
            <form id="add-app-form" onSubmit={this.submitArchiveJob}>
              <b>Reason: </b>
              <select id ='archive-offer'>
                <option value="rejected">Declined Offer</option>
                <option value="not interested">Rescinded Offer</option>
              </select>
              <br/><br/>
              <input type='submit' value='OK' />
            </form>
          </div>

        </Modal>
      </tr>
    )
  }
}
