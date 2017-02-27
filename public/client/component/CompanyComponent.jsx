import React from 'react';
import $ from 'jQuery';
import CompanyListComponent from './CompanyListComponent.jsx';
import CompanySearch from './CompanySearch.jsx';
import Modal from 'react-modal';


export default class CompanyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyInfo: [],
      companyView: '',
      value: '',
      hidden: false,
      modalIsOpen: false
    }
    this.getCompanyInfo = this.getCompanyInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitApp = this.submitApp.bind(this);
  }

  show(){
    this.setState({hidden : true});
  }
  getCompanyInfo(event) {
    event.preventDefault();
    var context = this;
    console.log('this is the state value' ,this.state.value)
    $.ajax({
      method:'GET',
      url:'http://localhost:3000/api/company?company='+ this.state.value,
      contentType: 'application/json',
      success: function(data) {
        console.log('This glassdoor info', data)
        context.setState({
          companyInfo: data[0],
          companyView: data[1]
        })
       context.show();
      },
      error: function(error) {
        console.log(error);
      }
    })
  }
  handleChange(event) {
    // console.log(this.state.value)
    this.setState({value: event.target.value});
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
  submitApp(event) {
    event.preventDefault();
  }
  render() {
    var immg = null;
    if (this.state.hidden) {
      immg = <img className="companyImg" src={this.state.companyInfo[0].squareLogo }/>
    }
    return (
      <div className="container">
        <CompanySearch getCompanyInfo={this.getCompanyInfo} handleChange={this.handleChange}/>
       <div>
       {this.state.hidden ? <CompanyListComponent companyInfo={[this.state.companyInfo[0]]} companyView={this.state.companyView}/> : null}
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
              Add an Interview Review Below:
            </div>
            <div className='add-app-container'>
              <form id="add-app-form" onSubmit={this.submitApp}>
                Enter Role applied for<br />
                <input type='text' name='title' ref='title' placeholder='i.e Frontend Developer..' /><br />
                Date<br />
                <input type='text' name='company' ref='company' placeholder='i.e 03/20/2017' /><br />
                City<br />
                <input type='text' name='city' ref='city' placeholder='City' /><br />
                State<br />
                <input type='text' name='state' placeholder='ST' ref='state' className="st-input" maxLength='2' /><br />
                Comment<br />
                <textarea name='description' form='add-app-form' ref='description' placeholder='Enter a Comment ...'></textarea><br />
                <input type='submit' className='add-small' value='Add' />
              </form>
            </div>

          </div>

        </Modal>
        <div className="item animated fadeInDownBig  newDiv">

        <br /> <br />Work at Google? Share Your Experience<br /> <br />
        {immg} <div id="stars">
          </div> <br/> <br />
          <textarea type='submit' className="textareas" value='Start Your Review Here ..' onClick={this.openModal}></textarea>
        </div>
      </div>
    )
  }
}