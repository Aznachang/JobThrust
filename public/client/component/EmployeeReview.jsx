import React from 'react';
import $ from 'jQuery';

export default class EmployeeReview extends React.Component {
	constructor() {
    super(props);
    this.state = {
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }
  openModal() {
    this.setState({modalIsOpen: true});
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = '#f00';
    // this.refs.testingthis.style = 'color: orange; font-weight: bold;';
  }
  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}