import React from 'react';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="poc-info">
          <h3>Primary Contact Info</h3>
          <div>Name: {this.props.contactInfo.name}</div>
          <div>E-Mail: {this.props.contactInfo.email}</div>
          <div>Phone: {this.props.contactInfo.phone}</div>
        </div>
      </div>
    )
  }
}