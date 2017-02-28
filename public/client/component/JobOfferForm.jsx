import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

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
        context.getOffer();
      });

      // close Job Offer Form Upon Updating...
      this.closeModal();
    }

    // value = {this.props.jobOffers.salary}
  render() {
    return (
      <div className="add-app-manual">
        <div className="add-app-btn" onClick={this.openModal}>
          <span>Job Offer</span>
        </div>
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
              <input type='text' name='salary' ref='salary' placeholder='50000' /><br />
              Signing Bonus<br />
              <input type='text' name='signBonus' ref='signBonus' placeholder='5000' /><br />
              Vacation Days<br />
              <input type='text' name='vacationDays' ref='vacationDays' placeholder='14' /><br />
              401K Company Match %<br />
              <input type='text' name='retireMatchPercent' ref='retireMatchPercent' placeholder='5' /><br />

              <input type='submit' value='Add' />
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}

// export default JobOfferForm;