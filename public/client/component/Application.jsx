import React from 'react';
import Modal from 'react-modal';

var appElement = document.getElementById('app');

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.nextStage = this.nextStage.bind(this);
    this.state = {
      modalIsOpen: false
    }

    console.log('PROPS:', this.props);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // TO BE APPLIED SOMEHOW - FULLY FUNCTIONING, JUST NOT ATTACHED TO ANYTHING
  nextStage() {
    console.log('Attempting to change stages using ID:', this.props.id);
    this.props.changeStage(this.props.id);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = '#f00';
    // this.refs.testingthis.style = 'color: orange; font-weight: bold;';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }



  render() {
    return (
      <tr className="application">
        <td className="job-title" onClick={this.openModal}>{this.props.job}</td>
        <td className="stage" onClick={this.openModal}>{this.props.stage}</td>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="modal-content"
          overlayClassName="modal-overlay"
        >

          <div className="inner-container">

            <h2>{this.props.job}</h2>
            <div>Current Stage: {this.props.stage}</div>
            <div>Job ID: {this.props.jobId}</div>
          </div>

        </Modal>
      </tr>
    )
  }
}