import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

var appElement = document.getElementById('app');

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.nextStage = this.nextStage.bind(this);
    this.getJobInfo = this.getJobInfo.bind(this);
    this.state = {
      modalIsOpen: false,
      selectedAppJob: {
        title: '',
        description: '',
        fullDescription: [],
        company: '',
        key: ''
      }
    }

    console.log('PROPS:', this.props);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  getJobInfo() {
    var context = this;
    // Query database for related job information given a jobId
    axios.get('/api/job/' + this.props.jobId).then(function(res) {
      console.log(res);
      res.data.fullDescription = res.data.fullDescription.split('\n');
      context.setState({selectedAppJob: res.data});
      console.log(res.data.fullDescription);
    });
  }

  // TO BE APPLIED SOMEHOW - FULLY FUNCTIONING, JUST NOT ATTACHED TO ANYTHING
  nextStage() {
    console.log('Attempting to change stages using ID:', this.props.id);
    this.props.changeStage(this.props.id);
  }

  openModal() {
    this.setState({modalIsOpen: true});
    this.getJobInfo();
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
            <div>Job Description:</div>
            <div className="job-desc">
              { this.state.selectedAppJob.fullDescription.map(chunk =>
                <span>{chunk}<br/></span>
              ) }
            </div>
          </div>

        </Modal>
      </tr>
    )
  }
}