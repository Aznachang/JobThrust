import React from 'react';
import axios from 'axios';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    }

    this.toggleEdit = this.toggleEdit.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
  }

  toggleEdit() {
    if (this.state.editing) {
      this.setState({editing: false});
    } else {
      this.setState({editing: true});
    }
  }

  submitChanges(e) {
    e.preventDefault();

    var context = this;
    axios.post('/api/contact', {
      name: context.refs.contactName.value,
      email: context.refs.contactEmail.value,
      phone: context.refs.contactPhone.value,
      appId: context.props.appId
    }).then(function(res) {
      console.log('Contact info updated:', res);
      context.props.getContact();
      context.toggleEdit();
    });
  }

  render() {
    if (!this.state.editing) {
      return (
        <div>
          <div className="poc-info" onClick={this.toggleEdit}>
            <h3>Primary Contact Info</h3>
            <div>Name: {this.props.contactInfo.name}</div>
            <div>E-Mail: {this.props.contactInfo.email}</div>
            <div>Phone: {this.props.contactInfo.phone}</div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="poc-info-edit">
            <h3>Primary Contact Info</h3>
            <form name='edit-contact' onSubmit={this.submitChanges}>
            <div>Name: <input type='text' ref='contactName' name='contact-name' defaultValue={this.props.contactInfo.name} /></div>
            <div>E-Mail: <input type='text' ref='contactEmail' name='contact-email' defaultValue={this.props.contactInfo.email} /></div>
            <div>Phone: <input type='text' ref='contactPhone' name='contact-phone' defaultValue={this.props.contactInfo.phone} /></div>
            <div className='app-btn' onClick={this.toggleEdit}>Cancel</div>
            <input type='submit' value='Submit Changes' />
            </form>
          </div>
        </div>
      )
    }
  }
}