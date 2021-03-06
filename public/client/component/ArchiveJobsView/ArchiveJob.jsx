import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import EventForm from '../EventForm.jsx';
import EventList from '../EventList.jsx';
import NoteContainer from '../NoteView/NoteContainer.jsx';
import Contact from '../Contact.jsx';
import EmailList from '../EmailList.jsx';
import $ from 'jQuery';

var appElement = document.getElementById('app');

export default class Application extends React.Component {
  constructor(props) {
    super(props);

    this.getJobInfo = this.getJobInfo.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.postEvent = this.postEvent.bind(this);
    this.toggleEventCreate = this.toggleEventCreate.bind(this);
    this.convertDate = this.convertDate.bind(this);
    this.getContact = this.getContact.bind(this);

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
        'contact': 'contact hidden',
        'job-desc': 'job-desc hidden',
        'notes': 'notes hidden',
        'events': 'events hidden'
      },
      calendarItems: [{
        start: {dateTime: ''},
        summary: '',
        description: []
      }],
      addingEvent: false,
      contactInfo: {
        name: null,
        email: null,
        phone: null
      },
      emailData: []
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
    this.props.changeStage(this.props.id, stageId);
  }

  openModal() {
    this.setState({modalIsOpen: true});
    this.getJobInfo();
    this.getContact();
    this.getEvents();
  }

  afterOpenModal() {
    this.toggle('contact');

  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      modalSections: {
        'job-desc': 'job-desc hidden',
        'notes': 'notes hidden',
        'events': 'events hidden',
        'contact': 'contact hidden',
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
        currentSections[key] = key;
      }
    }

    // changes background color of selected button
    var sectionButtons = {
      'job-desc': 'desc-select',
      'change-stage': 'stage-select',
      'notes': 'notes-select',
      'events': 'events-select',
      'contact': 'contact-select',
    }

    for (var button in sectionButtons) {
      $('.' + sectionButtons[button]).removeClass('selected-btn');
    }

    $('.' + sectionButtons[className]).addClass('selected-btn');

    this.setState({addingEvent: false});
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
    });

  }

  convertDate(date) {
    // 2017-02-28T11:30:00-08:00
    var month = date.substring(5, 7);
    var day = date.substring(8, 10);
    var year = date.substring(0, 4);
    var timeHour = date.substring(11, 13);
    var timeMin = date.substring(14, 16);

    var amPm = 'AM';

    timeHour -= 8;

    if (+timeHour < 0) {
      timeHour += 24;
    }

    if (+timeHour <= 11) {
      timeHour = +timeHour.toString();
    }

    if (+timeHour > 11) {
      amPm = 'PM';
      timeHour = (+timeHour - 12).toString();
    }

    // Make Sure it is '12' and not '00'
    if (timeHour === '00' || timeHour === '0') {
      timeHour = '12';
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
      context.getEvents();
      context.setState({addingEvent: false});
    });
  }

  getContact() {
    var context = this;
    axios.get('/api/contact/' + context.props.id).then(function(res) {
      context.setState({
        contactInfo: res.data
      });

      // Once contact info in place, get emails
      axios.post('/api/mail/thread', {email: context.state.contactInfo.email}).then(function(res) {
        context.setState({emailData: res.data.threads});
      });

    });
  }

  render() {
    return (
      <tr className="application">
        <td className="job-title" onClick={this.openModal}>{this.props.job}</td>
        <td onClick={this.openModal}>{this.props.company}</td>
        <td className="stage" onClick={this.openModal}>{this.props.stage}</td>
        <td onClick={this.openModal}>{this.props.reason}</td>
        <td onClick={this.openModal}>{this.convertDate(this.props.created).substring(0, 10)}</td>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <div className="inner-container">

            <h2 onClick={this.sendMessage}>{this.props.job} ({this.props.company})</h2>
            <div id="stage-name">Current Stage: {this.props.stage}</div>
            <div className="btn-container">
              <div className="app-tab contact-select" onClick={this.toggle.bind(null, 'contact')}>Contact</div>
              <div className="app-tab events-select" onClick={this.toggle.bind(null, 'events')}>Events</div>
              <div className="app-tab notes-select" onClick={this.toggle.bind(null, 'notes')}>Notes</div>
              <div className="app-tab app-tab-last desc-select" onClick={this.toggle.bind(null, 'job-desc')}>Job Description</div>
            </div>

            <div className={this.state.modalSections['contact']}>
              <Contact appId={this.props.id} getContact={this.getContact} contactInfo={this.state.contactInfo} />
              <EmailList emailData={this.state.emailData} getContact={this.getContact} contactEmail={this.state.contactInfo.email}/>
            </div>

            <div className={this.state.modalSections['job-desc']}>
              { this.state.selectedAppJob.fullDescription.map((chunk, index) =>
                <span key={index}>{chunk}<br/></span>
              ) }
            </div>

            <div className={this.state.modalSections['events']}>
              <div className="add-event-help">Receive a calendar invite related to this job?  Add "APPID-{this.props.id}" to the invite description to be able to see it here.</div>
              <div className="btn-container cal-event-buttons">
                <div className="app-btn cal-btn" onClick={this.toggleEventCreate}>📅 Create</div>
                <div className="app-btn cal-btn" onClick={this.getEvents}>🗘 Refresh</div>
              </div>
              <EventForm appId={this.props.id} job={this.props.job} company={this.props.company} postEvent={this.postEvent} addingEvent={this.state.addingEvent}/>
              <EventList calendarItems={this.state.calendarItems} />

            </div>

            <div className={this.state.modalSections['notes']}>
              <NoteContainer convertDate={this.convertDate} appId={this.props.id} />
            </div>

          </div>
        </Modal>
      </tr>
    )
  }
}