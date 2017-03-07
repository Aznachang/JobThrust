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
        user: ''
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

    // close Job Offer Form Upon Updating...
    this.closeModal();
  }

  //UPDATE A JOB OFFER
  submitArchiveJob(e) {
    e.preventDefault();
    var context = this;

    var archiveOfferData = {
      active: false,
      activeReason: $( "#archive-offer option:selected" ).text()
    };

    axios.put('/api/application/offers/'+ this.props.offerId, archiveOfferData)
    .then(function(offers) {
      context.props.getOffer();
      context.props.getArchivedJobOffers();
    });

    // close Job Offer Form Upon Updating...
    this.closeModal();
  }

  componentDidMount() {
    var context = this;
    context.props.getOffer();
    context.props.getArchivedJobOffers();
  }

  render() {
    return (
      <div className="add-app-manual">
        <td onClick={this.openModal}>📂</td>
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
                <b> Detailed Job Offers Comparison: </b>
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

          <div className='add-app-container'>
            <div className='desc-header'>
              <b> Update Your Job Offer: </b>
            </div>
            <form id="add-app-form" onSubmit={this.submitJobOffer}>
              Salary<br />
              <input type='text' name='salary' ref='salary' placeholder='50000' defaultValue={this.props.jobOffers.salary}/><br />
              Signing Bonus<br />
              <input type='text' name='signBonus' ref='signBonus' placeholder='5000' defaultValue = {this.props.jobOffers.signBonus} /><br />
              Vacation Days<br />
              <input type='text' name='vacationDays' ref='vacationDays' placeholder='14' defaultValue = {this.props.jobOffers.vacationDays}/><br />
              401K Company Match %<br />
              <input type='text' name='retireMatchPercent' ref='retireMatchPercent' placeholder='5' defaultValue = {this.props.jobOffers.retireMatchPercent}/><br />

              <input type='submit' value='Add' /> <br />
            </form>
          </div>

          <div className='add-app-container'>
            <div className='desc-header'>
              <b> Archiving Your Job Offer: </b>
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
      </div>
    )
  }
}
