import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import NoteContainer from '../NoteView/NoteContainer.jsx';

export default class JobOfferCompare extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalIsOpen: false
    }

            /**** Modal Bindings ****/
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  render() {
    return (
      <tr>
        <td>{this.props.jobOffer.jobTitle} - {this.props.jobOffer.companyName}</td>
        <td>${this.props.jobOffer.salary}</td>
        <td>${this.props.jobOffer.signBonus}</td>
        <td>{this.props.jobOffer.vacationDays}</td>
        <td>{this.props.jobOffer.retireMatchPercent}%</td>
        <td onClick={this.openModal}><span className='offer-click-icon'>📔</span></td>
        <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Example Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
        >
        <div className="inner-container">
          <div className='add-app-container'>
            <div className='desc-header'>
              <b> Additional Benefits and Notes</b>
            </div>
              <NoteContainer convertDate={this.props.convertDate} appId={this.props.jobOffer.applicationId}/>
            </div>
          </div>
        </Modal>
      </tr>
    )
  }
}