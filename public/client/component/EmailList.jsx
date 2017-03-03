import React from 'react';
import EmailThread from './EmailThread.jsx';

export default class EmailList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.emailData) {
      return (
        <div className='email-list'>
          {this.props.emailData.map((thread, i) =>
            <EmailThread data={thread} key={i} />
          )}
        </div>
      )
      
    } else {
      return (
        <div></div>
      )
    }

  }
}