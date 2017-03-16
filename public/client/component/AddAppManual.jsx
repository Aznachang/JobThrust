import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

export default class AddAppManual extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      user: ''
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitApp = this.submitApp.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    var context = this;
    axios.get('/api/user').then(function(res) {
      context.setState({ user: res.data });
    });

  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  submitApp(e) {
    e.preventDefault();
    var context = this;

    var appData = {
      title: this.refs.title.value,
      company: this.refs.company.value,
      city: this.refs.city.value,
      state: this.refs.state.value,
      fullDescription: this.refs.description.value,
      key: 'MANUAL-' + this.state.user + Math.round(Math.random() * 1562034)
    }

    axios.post('/api/job', appData).then(function(res) {
      context.props.getJobs();
    });

    this.closeModal();
  }

  render() {
    return (
      <div className="add-app-manual">
          <div className="add-app-btn" onClick={this.openModal}>
            <span>ADD A NEW OPPORTUNITY MANUALLY</span>
          </div>
          <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="modal-content"
          overlayClassName="modal-overlay"
        >

          <div className="inner-container">
            <div className='desc-header'>
              Enter new opportunity info:
            </div>
            <div className='add-app-container'>
              <form id="add-app-form" onSubmit={this.submitApp}>
                Job Title<br />
                <input type='text' name='title' ref='title' placeholder='Job Title' /><br />
                Company<br />
                <input type='text' name='company' ref='company' placeholder='Company' /><br />
                City<br />
                <input type='text' name='city' ref='city' placeholder='City' /><br />
                State<br />
                <input type='text' name='state' placeholder='ST' ref='state' className="st-input" maxLength='2' /><br />
                Job Description<br />
                <textarea name='description' form='add-app-form' ref='description' placeholder='Enter job description...'></textarea><br />
                <input type='submit' className='add-small' value='Add' />
              </form>
            </div>

          </div>

        </Modal>
      </div>
    )
  }
}