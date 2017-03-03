import React from 'react';

export default class EmailItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggleCollapsed = this.toggleCollapsed.bind(this);

  }

  componentWillMount() {
    console.log('Thread length:', this.props.threadLength);
    console.log('Key:', this.props.itemNum);
    if (this.props.itemNum === this.props.threadLength - 1) {
      this.setState({collapsed: false});
    } else {
      this.setState({collapsed: true});
    }
    
  }

  toggleCollapsed() {
    if (!this.state.collapsed) {
      this.setState({collapsed: true});
    } else {
      this.setState({collapsed: false});
    }
  }

  render() {
    if (this.state.collapsed === false) {
      return (
        <div className='email-message' onClick={this.toggleCollapsed}>
          <p>From: {this.props.message.from}</p>
          <p>To: {this.props.message.to}</p>
          <p>Sent: {this.props.message.sentAt}</p>
          <p>Subject: {this.props.message.subject}</p>
          <div className='email-message-body'>
            {this.props.message.body.map((line, ind) =>
              <p key={ind}>{line}</p>
            )}
          </div>
        </div>
      )   

    } else {
      return (
        <div className='email-message-collapsed' onClick={this.toggleCollapsed}>
          <p>Subject: {this.props.message.subject}</p>
        </div>
      )   
    }

  }

}