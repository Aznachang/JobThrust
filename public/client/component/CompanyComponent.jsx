import React from 'react';
import $ from 'jQuery';
import CompanyListComponent from './CompanyListComponent.jsx';
import CompanySearch from './CompanySearch.jsx';
import Modal from 'react-modal';
import InterviewReviews from './InterviewReviews.jsx';


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
      interviewQuestion: null,
      renderData: null
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
    this.retrieveDataFromDB = this.retrieveDataFromDB.bind(this);
  }

  show(){
    this.setState({hidden : true});
  }
  getCompanyInfo(event) {
    event.preventDefault();
    this.retrieveDataFromDB();
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

  retrieveDataFromDB() {
    var context = this;
    var name = this.state.value;
    $.ajax({
      method:'GET',
      url:'http://localhost:3000/api/interviewreview?name='+ name,
      contentType: 'application/json',
      success: function(data) {
        // console.log('-----3333333', data[0]._id);
        context.setState({
          renderData: data
        })
      },
      error: function(err) {
        console.log('You have an error', err)
      }
    })
  }

  submitApp(event) {
    event.preventDefault();

    var interviewCompany = {id:Math.floor(Math.random()* 900000000), name: this.state.value, imgUrl:this.state.companyInfo[0].squareLogo ,companyComments: [{jobTitle:this.state.title},{date:this.state.date},{interviewProcess:{descriptionOfinterview:this.state.interviewProcess,interviewQuestion:this.state.interviewQuestion ,interviewProcess:this.state.description}}]};
    var context = this;
    $.ajax({
      method:'POST',
      url:'http://localhost:3000/api/interviewreview',
      contentType: 'application/json',
      data: JSON.stringify(interviewCompany),
      success: function(data) {
        context.retrieveDataFromDB();
      },
      error: function(err) {
        console.log('You have an error', err)
      }
    })

    this.closeModal();
  }

  handleChangeForModalDescriptionA(event){
    this.setState({
      description: event.target.value
    });
  }
  handleChangeForModalDate(event){
    this.setState({
      date: event.target.value
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
                <input type='text' name='title' className='jobTitle' placeholder='i.e Frontend Developer..' onChange={this.handleChangeForModalTitle} required/><br />
                Date<br />
                <input type='text' name='company' className='date' placeholder='i.e 03/20/2017' onChange={this.handleChangeForModalDate} required/><br />
                Describe the Interview Process<br />
                <textarea name='description' form='add-app-form' className='interviewProcess' placeholder='Enter a Comment ...' onChange={this.handleChangeForModalInterviewProcess}required></textarea><br />
                Interview Questions<br />
                <textarea name='description' form='add-app-form' className='interviewQuestion' placeholder='Enter a Comment ...' onChange={this.handleChangeForModalInterviewQuestion}required></textarea><br />
                <textarea name='description' form='add-app-form' className='interviewAnswer' placeholder='Enter a Comment ...' onChange={this.handleChangeForModalDescriptionA} required></textarea><br />
                <input type='submit' className='add-small' value='Submit Interview' />
              </form>
            </div>

          </div>

        </Modal>
        <div className="item animated fadeInDownBig  newDiv">
          {this.state.renderData !== null ? <InterviewReviews renderData={this.state.renderData} imgUrl={this.state.hidden? this.state.companyInfo[0].squareLogo : null} companyName={this.state.value} retrieveDataFromDB={this.retrieveDataFromDB}/>: null }
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