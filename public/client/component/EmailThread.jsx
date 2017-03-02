import React from 'react';
import EmailItem from './EmailItem.jsx';

export default class EmailThread extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div className='email-thread'>
        {this.props.data.map((message, i) =>
          <EmailItem key={i} message={message} threadLength={this.props.data.length} itemNum={i} />
        )}
      </div>
    )
  
  }
}