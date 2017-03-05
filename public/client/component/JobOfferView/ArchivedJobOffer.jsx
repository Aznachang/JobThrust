import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import NoteContainer from '../NoteView/NoteContainer.jsx';

export default class ArchivedJobOffer extends React.Component {
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
        <td>{this.props.archivedOffers.companyName} - {this.props.archivedOffers.jobTitle}</td>
        <td>${this.props.archivedOffers.salary}</td>
        <td>${this.props.archivedOffers.signBonus}</td>
        <td>{this.props.archivedOffers.vacationDays}</td>
        <td>{this.props.archivedOffers.retireMatchPercent}%</td>
        <td>
          <div className="add-joboffer-btn" onClick={this.openModal}>
            <div>
              <span onClick={this.openModal}>View</span>
            </div>
          </div>
        </td>
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
              <NoteContainer appId={this.props.archivedOffers.applicationId}/>
            </div>
          </div>
        </Modal>
      </tr>
    )
  }
}