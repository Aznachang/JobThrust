import React from 'react';
import EmailThread from './EmailThread.jsx';

export default class EmailList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className='email-list'>
        {this.props.emailData.map((thread, i) =>
          <EmailThread data={thread} key={i} />
        )}
      </div>
    )
  }
}