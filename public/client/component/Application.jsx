import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import NoteContainer from './NoteContainer.jsx';
import EventForm from './EventForm.jsx';
// import JobOfferContianer from './JobOfferContianer.jsx';
// import JobOfferForm from './JobOfferForm.jsx';

var appElement = document.getElementById('app');

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    // this.nextStage = this.nextStage.bind(this);
    this.getJobInfo = this.getJobInfo.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.postEvent = this.postEvent.bind(this);
    this.addEvent = this.addEvent.bind(this);
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
        'change-stage': 'change-stage hidden',
        'notes': 'notes hidden',
        'events': 'events hidden'
      },
      calendarItems: [{
        start: {dateTime: ''},
        summary: ''
      }],
      addingEvent: false
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
    console.log('THIS APPLICATION ID IS:', this.props.id);
    this.getEvents();
  }

  afterOpenModal() {

  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      modalSections: {
        'job-desc': 'job-desc hidden',
        'change-stage': 'change-stage hidden',
        'notes': 'notes hidden',
        'events': 'events hidden'
      }
    });
    if (this.props.filtered !== null) {
      this.props.filter(this.props.filtered);
      this.props.filter(this.props.filtered);
    }
    this.props.sortList();

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

  getEvents() {
    var context = this;
    axios.post('/api/goog/calget', {id: context.props.id}).then(function(res) {
      console.log('CAL DATA:', res.data.items);
      console.log('Items are array?', Array.isArray(res.data.items));
      context.setState({ calendarItems: res.data.items });
      console.log('START', context.state.calendarItems[0].start);
    });
  }

  addEvent() {
    this.setState({addingEvent: true});
  }

  postEvent(data) {
    var context = this;

    axios.post('/api/goog/cal', data).then(function(res) {
      console.log('Created event!');
      context.getEvents();
      context.setState({addingEvent: false});
      console.log('ADDING EVENT STATE', this.state.addingEvent);
    });
  }

  render() {
    return (
      <tr className="application">
        <td className="job-title" onClick={this.openModal}>{this.props.job}</td>
        <td onClick={this.openModal}>{this.props.company}</td>
        <td className="stage" onClick={this.openModal}>{this.props.stage}</td>
        <td onClick={this.openModal}>{this.props.created.slice(0,10)}</td>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="modal-content"
          overlayClassName="modal-overlay"
        >

          <div className="inner-container">

            <h2>{this.props.job} ({this.props.company})</h2>
            <div id="stage-name">Current Stage: {this.props.stage}</div>
            <div className="btn-container">
              <div className="app-btn" onClick={this.toggle.bind(null, 'job-desc')}>Job Description</div>
              <div className="app-btn" onClick={this.toggle.bind(null, 'notes')}>Notes</div>
              <div className="app-btn" onClick={this.toggle.bind(null, 'events')}>Events</div>
              <div className="app-btn" onClick={this.toggle.bind(null, 'change-stage')}>Change Stage</div>
            </div>

            <div className={this.state.modalSections['job-desc']}>
              { this.state.selectedAppJob.fullDescription.map((chunk, index) =>
                <span key={index}>{chunk}<br/></span>
              ) }
            </div>

            <div className={this.state.modalSections['events']}>
              <button className="app-btn" onClick={this.addEvent}>ADD EVENT</button>
              <EventForm appId={this.props.id} postEvent={this.postEvent} addingEvent={this.state.addingEvent}/>
              { this.state.calendarItems.map((item, index) =>
                <div className='calendar-item' key={index}>
                  <p>Event: {item.summary}</p>
                  <p>Start: {item.start.dateTime}</p>
                  <p>Description: {item.description}</p>
                  <p>
                    Location: {item.location} (<a href={'https://www.google.com/maps/search/' + item.location} target='_blank'>Google Maps</a>)
                  </p>
                  <p><a href={item.htmlLink} target='_blank'>View/edit on Google Calendar</a></p>
                </div>
              )}
            </div>

            <div className={this.state.modalSections['change-stage']}>
              <div className="stage-choice-header">Select stage to switch to:</div>
              { this.props.stages.map((stage, index) =>
                <div key={index} className="stage-btn" onClick={this.nextStage.bind(this, index)}>{stage}</div>
              ) }
            </div>

            <div className={this.state.modalSections['notes']}>
              <NoteContainer appId={this.props.id} />
            </div>
          </div>

        </Modal>
      </tr>
    )
  }
}