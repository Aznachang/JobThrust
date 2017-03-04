import React from 'react';
import EmailThread from './EmailThread.jsx';

export default class EmailList extends React.Component {
  constructor(props) {
    super(props);

    this.openWindow = this.openWindow.bind(this);
  }

  openWindow() {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + this.props.contactEmail, 'newwindow', 'width=500, height=400');

    return false;
  }

  render() {
    if (this.props.emailData.length > 0) {
      return (
        <div>
          <div className='mail-btn-container'>
            <div className="app-btn cal-btn" onClick={this.openWindow}>📄 Compose New</div>
            <div className="app-btn cal-btn" onClick={this.props.getContact}>🗘 Refresh</div>
          </div>
          <div className='email-list'>
            <h3>E-Mail Threads</h3>
            {this.props.emailData.map((thread, i) =>
              <EmailThread data={thread} key={i} />
            )}
          </div>
        </div>
      )
      
    } else {
      return (
        <div>
          <div className='mail-btn-container'>
            <div className="app-btn cal-btn" onClick={this.openWindow}>📄 Compose New</div>
            <div className="app-btn cal-btn" onClick={this.props.getContact}>🗘 Refresh</div>
          </div>
        </div>
      )
    }

  }
}