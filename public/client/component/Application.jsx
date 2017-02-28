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
    this.toggleEventCreate = this.toggleEventCreate.bind(this);
    this.convertDate = this.convertDate.bind(this);
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
        summary: '',
        description: []
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
      res.data.items.forEach(function(item) {
        item.start.dateTime = context.convertDate(item.start.dateTime);
        item.description = item.description.split(/[\n\r]/g);
      });
      context.setState({ calendarItems: res.data.items });
      console.log('CAL DATA', res.data.items);
    });
  }

  convertDate(date) {
    // 2017-02-28T11:30:00-08:00
    console.log('Converting', date);
    var month = date.substring(5, 7);
    var day = date.substring(8, 10);
    var year = date.substring(0, 4);
    var timeHour = date.substring(11, 13);
    var timeMin = date.substring(14, 16);

    var amPm = 'AM';

    if (+timeHour > 11) {
      amPm = 'PM';
      timeHour = (+timeHour - 12).toString();
    }

    return month + '/' + day + '/' + year + ', ' + timeHour + ':' + timeMin + ' ' + amPm;
  }

  toggleEventCreate() {
    if (!this.state.addingEvent) {
      this.setState({addingEvent: true});
    } else {
      this.setState({addingEvent: false});
    }
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
            <div className="add-event-help">Receive a calendar invite related to this job?  Add "APPID-{this.props.id}" to the invite description to be able to see it here.</div>
              <div className="btn-container cal-event-buttons">
                <div className="app-btn" onClick={this.toggleEventCreate}>CREATE</div>
                <div className="app-btn" onClick={this.getEvents}>UPDATE</div>
              </div>
              <EventForm appId={this.props.id} postEvent={this.postEvent} addingEvent={this.state.addingEvent}/>
              { this.state.calendarItems.map((item, index) =>
                <div className='calendar-item' key={index}>
                  <p className='event-date'>{item.start.dateTime}</p>
                  <p>Event: {item.summary}</p>
                  <p>
                    Location: {item.location} (<a href={'https://www.google.com/maps/search/' + item.location} target='_blank'>Google Maps</a>)
                  </p>
                  <p className="event-description">
                  {item.description.map((line, i) =>
                    <p key={i}>{line}</p>
                  ) }
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