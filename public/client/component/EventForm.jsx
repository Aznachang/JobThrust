import React from 'react';
import $ from 'jQuery';

var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

var days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

var years = ['2017', '2018', '2019', '2020'];

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.createEvent = this.createEvent.bind(this);
    this.handleChange = this.createEvent.bind(this);
  }

  createEvent(e) {

    e.preventDefault();

    var calcHour = function(hour, tod) {
      if (tod === 'PM') {
        return (+hour + 12).toString();
      } else if (tod === 'AM' && hour === '12') {
        return '00';
      } else {
        return hour;
      }
    }

    var twoDigit = function(string) {
      if (string.length < 2) {
        string = '0' + string;
      }

      return string;
    }

    var event = {
      'summary': '[JobThrust] ' + this.refs.name.value,
      'location': this.refs.location.value,
      'description': $('#description-text').val(),
      'start': {
        'dateTime': this.refs.startYear.value + '-' + twoDigit(this.refs.startMonth.value) + '-' + twoDigit(this.refs.startDay.value) + 'T' + calcHour(this.refs.startHour.value, this.refs.timeOfDay.value) + ':' + this.refs.startMinutes.value + ':00-07:00',
        'timeZone': 'America/Los_Angeles',
      },
      'end': {
        'dateTime': this.refs.endYear.value + '-' + twoDigit(this.refs.endMonth.value) + '-' + twoDigit(this.refs.endDay.value) + 'T' + calcHour(this.refs.endHour.value, this.refs.endTimeOfDay.value) + ':' + this.refs.endMinutes.value + ':00-07:00',
        'timeZone': 'America/Los_Angeles',
      },
      'attendees': [],
      'reminders': {
        'useDefault': true
      },
      'extendedProperties': {
        'private': {
          'applicationId': this.props.appId
        }
      }
    };


    this.props.postEvent(event);
    console.log('Event created');

    this.refs.name.value = '';

  }

  render() {
    if (this.props.addingEvent) {

      return (

        <form id='event-form' className='add-event-form' onSubmit={this.createEvent}>
          <div className='upper-event-form'>
            <div>
              <p>Event Name</p>
              <input type='text' ref='name' name='event-name' placeholder='Event Name' />
              <p>Location</p>
              <input type='text' ref='location' name='event-location' placeholder='Location' />
            </div>
            <div>
              <p>Start Date</p>
              <select ref='startMonth'>
                {months.map((month, i) =>
                  <option key={i} value={i + 1}>{month}</option>
                )}
              </select>
              <select ref='startDay'>
                {days.map((day, i) =>
                  <option key={i} value={day}>{day}</option>
                )}
              </select>
              <select ref='startYear'>
                {years.map((year, i) =>
                  <option key={i} value={year}>{year}</option>
                )}
              </select>
              <p>Start Time</p>
              <input type='text' className='small-input-hour' ref='startHour' name='event-hour' placeholder='HR' /><span>:</span>
              <input type='text' className='small-input-min' ref='startMinutes' name='event-min' placeholder='MIN' />
              <select ref='timeOfDay'>
                <option value='AM'>AM</option>
                <option value='PM'>PM</option>
              </select>
            </div>
             <div>
              <p>End Date</p>
              <select ref='endMonth'>
                {months.map((month, i) =>
                  <option key={i} value={i + 1}>{month}</option>
                )}
              </select>
              <select ref='endDay'>
                {days.map((day, i) =>
                  <option key={i} value={day}>{day}</option>
                )}
              </select>
              <select ref='endYear'>
                {years.map((year, i) =>
                  <option key={i} value={year}>{year}</option>
                )}
              </select>
              <p>End Time</p>
              <input type='text' className='small-input-hour' ref='endHour' name='event-end-hour' placeholder='HR' /><span>:</span>
              <input type='text' className='small-input-min' ref='endMinutes' name='event-end-min' placeholder='MIN' />
              <select ref='endTimeOfDay'>
                <option value='AM'>AM</option>
                <option value='PM'>PM</option>
              </select>
            </div>
          </div>
          <p>Description/Info</p>
          <textarea type='text' name='event-description' id='description-text' placeholder='Event description...'></textarea>
          <div>
            <input type='submit' value='Create' />
          </div>
        </form>
      )
    } else {
      return ( <div></div> )
    }

  }

}