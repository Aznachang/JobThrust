import React from 'react';

export default class EmailThread extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div className='email-thread'>
        {this.props.data.map((message, i) =>
          <div key={i} className='email-message'>
            <p>From: {message.from}</p>
            <p>To: {message.to}</p>
            <p>Sent: {message.sentAt}</p>
            <p>Subject: {message.subject}</p>
            <div className='email-message-body'>
              {message.body.map((line, ind) =>
                <p key={ind}>{line}</p>
              )}
            </div>
          </div>
        )}
      </div>
    )
  
  }
}