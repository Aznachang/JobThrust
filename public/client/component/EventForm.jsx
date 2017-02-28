import React from 'react';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.createEvent = this.createEvent.bind(this);
  }

  createEvent(e) {

    e.preventDefault();

    var calcHour = function(hour, tod) {
      if (tod === 'PM') {
        return hour + 12;
      } else {
        return hour;
      }
    }

    var event = {
      'summary': this.refs.name.value,
      'location': this.refs.location.value,
      'description': this.refs.description.value,
      'start': {
        'dateTime': this.refs.startYear.value + '-' + this.refs.startMonth.value + '-' + this.refs.startDay.value + 'T' + calcHour(this.refs.startHour.value, this.refs.timeOfDay.value) + ':' + this.refs.startMinutes.value + ':00-07:00',
        'timeZone': 'America/Los_Angeles',
      },
      'end': {
        'dateTime': this.refs.endYear.value + '-' + this.refs.endMonth.value + '-' + this.refs.endDay.value + 'T' + calcHour(this.refs.endHour.value, this.refs.endTimeOfDay.value) + ':' + this.refs.endMinutes.value + ':00-07:00',
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

    console.log('Event data:', event);

    // this.props.postEvent(event);

  }

  render() {
    return (

      <form id='event-form' className='add-event-form' onSubmit={this.createEvent}>
        <input type='text' ref='name' name='event-name' placeholder='Event Name' />
        <input type='text' ref='location' name='event-location' placeholder='Location' />
        <input type='text' ref='startMonth' name='event-month' placeholder='Month' />
        <input type='text' ref='startDay' name='event-day' placeholder='Day' />
        <input type='text' ref='startYear' name='event-year' placeholder='Year' />
        <input type='text' ref='startHour' name='event-hour' placeholder='HR' />
        <input type='text' ref='startMinutes' name='event-min' placeholder='MIN' />
        <select ref='timeOfDay'>
          <option value='AM'>AM</option>
          <option value='PM'>PM</option>
        </select>
        <input type='text' ref='endMonth' name='end-month' placeholder='Month' />
        <input type='text' ref='endDay' name='end-day' placeholder='Day' />
        <input type='text' ref='endYear' name='end-year' placeholder='Year' />
        <input type='text' ref='endHour' name='end-hour' placeholder='HR' />
        <input type='text' ref='endMinutes' name='end-min' placeholder='MIN' />
        <select ref='endTimeOfDay'>
          <option value='AM'>AM</option>
          <option value='PM'>PM</option>
        </select>
        <textarea name='event-description' ref='descripton' form='event-form' placeholder='Description of the event...'></textarea>
        <input type='submit' value='Create' />
      </form>

    )
  }

}