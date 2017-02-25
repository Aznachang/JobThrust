import React from 'react';
import Modal from 'react-modal';

export default class AddAppManual extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      selectedAppJob: {
        title: '',
        description: '',
        fullDescription: [],
        company: '',
        key: ''
      },
      modalSections: {
        'job-desc': 'job-desc hidden',
        'change-stage': 'change-stage hidden',
        'notes': 'notes hidden'
      }
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {

  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  submitApp() {

  }

  render() {
    return (
      <div className="add-app-manual">
          <div className="add-app-btn" onClick={this.openModal}>
            <span>Add an opportunity manually...</span>
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
              <form id="add-app-form">
                Job Title<br />
                <input type='text' name='title' placeholder='Job Title' /><br />
                Company<br />
                <input type='text' name='company' placeholder='Company' /><br />
                City<br />
                <input type='text' name='city' placeholder='City' /><br />
                State<br />
                <input type='text' name='state' placeholder='ST' className="st-input" maxLength='2' /><br />
                Job Description<br />
                <textarea name='description' form='add-app-form' placeholder='Enter job description...'></textarea><br />
                <input type='submit' value='Add' />
              </form>
            </div>

          </div>

        </Modal>
      </div>
    )
  }
}