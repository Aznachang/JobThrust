import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

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
      // e.preventDefault();
      var context = this;

      axios.put('/api/application/offers/1', {
        salary: this.refs.salary.value,
        signBonus: this.refs.signBonus.value,
        vacationDays: this.refs.vacationDays.value,
        retireMatchPercent: this.refs.retireMatchPercent.value,
      }).then(function(offers) {
        this.props.getOffers();
      });
    }

  render() {
    return (
      <div className="add-app-manual">
        <div className="add-app-btn" onClick={this.openModal}>
          <span>Edit Job Offer</span>
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
          <div className='desc-header'>
            Update Your Job Offer:
          </div>
          <div className='add-app-container'>
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

        </div>

        </Modal>
      </div>
    )
  }
}

// export default JobOfferForm;