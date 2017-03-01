import React from 'react';

export default class EventList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        { this.props.calendarItems.map((item, index) =>
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
    )
  }
}