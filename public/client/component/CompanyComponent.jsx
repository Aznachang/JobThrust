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
      modalIsOpen: false,
      title: null,
      discription: null,
      date: null,
      interviewProcess: null,
      interviewQuestion: null
    }
    this.getCompanyInfo = this.getCompanyInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitApp = this.submitApp.bind(this);
    this.handleChangeForModalDescriptionA = this.handleChangeForModalDescriptionA.bind(this);
    this.handleChangeForModalTitle = this.handleChangeForModalTitle.bind(this);
    this.handleChangeForModalDate = this.handleChangeForModalDate.bind(this);
    this.handleChangeForModalInterviewProcess = this.handleChangeForModalInterviewProcess.bind(this);
    this.handleChangeForModalInterviewQuestion = this.handleChangeForModalInterviewQuestion.bind(this);
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
    console.log(this.state.date)
    console.log(this.state.title)
    console.log(this.state.description)

    $('#comments').append('<h2>'+this.state.date + '</h2>');
    $('#comments').append('<h4>'+this.state.title + '</h4>');
    $('#comments').append('<h5>'+this.state.description + '</h5>');
    $('#comments').append('<div class="comments"></div>');

    this.closeModal();
  }
  handleChangeForModalDescriptionA(event){
    this.setState({
      description: event.target.value
    });
  }
  handleChangeForModalTitle(event){
    this.setState({
      title: event.target.value
    });
  }
  handleChangeForModalInterviewProcess(event){
    this.setState({
      interviewProcess: event.target.value
    });
  }
  handleChangeForModalInterviewQuestion(event){
    this.setState({
      interviewQuestion: event.target.value
    });
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
                Job Title<br />
                <input type='text' name='title' ref='title' placeholder='i.e Frontend Developer..' onChange={this.handleChangeForModalTitle}/><br />
                Date<br />
                <input type='text' name='company' ref='company' placeholder='i.e 03/20/2017' onChange={this.handleChangeForModalDate}/><br />
                Describe the Interview Process<br />
                <textarea name='description' form='add-app-form' ref='description' placeholder='Enter a Comment ...' onChange={this.handleChangeForModalInterviewProcess}></textarea><br />
                Interview Questions<br />
                <textarea name='description' form='add-app-form' ref='description' placeholder='Enter a Comment ...' onChange={this.handleChangeForModalInterviewQuestion}></textarea><br />
                <textarea name='description' form='add-app-form' ref='description' placeholder='Enter a Comment ...' onChange={this.handleChangeForModalDescriptionA}></textarea><br />
                <textarea name='description' form='add-app-form' ref='description' placeholder='Enter a Comment ...' onChange={this.handleChangeForModalInterviewQuestion}></textarea><br />
                <textarea name='description' form='add-app-form' ref='description' placeholder='Enter a Comment ...' onChange={this.handleChangeForModalDescriptionA}></textarea><br />
                <textarea name='description' form='add-app-form' ref='description' placeholder='Enter a Comment ...' onChange={this.handleChangeForModalInterviewQuestion}></textarea><br />
                <textarea name='description' form='add-app-form' ref='description' placeholder='Enter a Comment ...' onChange={this.handleChangeForModalDescriptionA}></textarea><br />
                <textarea name='description' form='add-app-form' ref='description' placeholder='Enter a Comment ...' onChange={this.handleChangeForModalInterviewQuestion}></textarea><br />
                <textarea name='description' form='add-app-form' ref='description' placeholder='Enter a Comment ...' onChange={this.handleChangeForModalDescriptionA}></textarea><br />
                <input type='submit' className='add-small' value='Submit Interview' />
              </form>
            </div>

          </div>

        </Modal>
        <div className="item animated fadeInDownBig  newDiv">
          <div id="comments"></div>
        </div>

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