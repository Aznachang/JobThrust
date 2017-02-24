import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

var appElement = document.getElementById('app');

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    // this.nextStage = this.nextStage.bind(this);
    this.getJobInfo = this.getJobInfo.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      modalIsOpen: false,
      selectedAppJob: {
        title: '',
        description: '',
        fullDescription: [],
        company: '',
        key: ''
      },
      modalSections: {
        'job-desc': 'job-desc hidden',
        'change-stage': 'change-stage hidden'
      }
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  getJobInfo() {
    var context = this;
    // Query database for related job information given a jobId
    axios.get('/api/job/' + this.props.jobId).then(function(res) {
      res.data.fullDescription = res.data.fullDescription.split('\n');
      context.setState({selectedAppJob: res.data});
    });
  }

  // TO BE APPLIED SOMEHOW - FULLY FUNCTIONING, JUST NOT ATTACHED TO ANYTHING
  nextStage(stageId) {
    console.log('Attempting to change stages using ID:', this.props.id);
    this.props.changeStage(this.props.id, stageId);
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
    this.setState({
      modalIsOpen: false,
      // modalSections: {
      //   'job-desc': 'job-desc hidden',
      //   'change-stage': 'change-stage hidden'
      // }
    });
    if (this.props.filtered !== null) {
      this.props.filter(this.props.filtered);
      this.props.filter(this.props.filtered);
    }
    // this.props.sortList();

  }

  toggle(className) { // handles toggling and ensuring no more than 1 section displays at once
    var currentSections = this.state.modalSections;
    for (var key in currentSections) {
      if (key !== className) {
        currentSections[key] = key + ' hidden';
      } else {
        if (currentSections[key] === className) {
          currentSections[key] = key + ' hidden';
        } else {
          currentSections[key] = key;
        }
      }
    }

    this.setState(currentSections);
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
            <div id="stage-name">Current Stage: {this.props.stage}</div>
            <div className="btn-container">
              <div className="app-btn" onClick={this.toggle.bind(null, 'job-desc')}>Job Description</div>
              <div className="app-btn">Notes</div>
              <div className="app-btn">Events</div>
              <div className="app-btn" onClick={this.toggle.bind(null, 'change-stage')}>Change Stage</div>
            </div>

            <div className={this.state.modalSections['job-desc']}>
              { this.state.selectedAppJob.fullDescription.map((chunk, index) =>
                <span key={index}>{chunk}<br/></span>
              ) }
            </div>

            <div className={this.state.modalSections['change-stage']}>
              <div className="stage-choice-header">Select stage to switch to:</div>
              { this.props.stages.map((stage, index) => 
                <div key={index} className="stage-btn" onClick={this.nextStage.bind(this, index)}>{stage}</div>
              ) }
            </div>
          </div>

        </Modal>
      </tr>
    )
  }
}