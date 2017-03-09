import React from 'react';
import $ from 'jQuery';
import CompanyListComponent from './CompanyListComponent.jsx';
import CompanySearch from './CompanySearch.jsx';
import Modal from 'react-modal';
import InterviewReviews from './InterviewReviews.jsx';
import EmployeeReview from './EmployeeReview.jsx';


export default class CompanyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyInfo: [],
      companyView: '',
      value: '',
      hidden: false,
      modalIsOpen: false,
      modalOpen: false,
      title: null,
      date: null,
      interviewProcess: null,
      interviewQuestion: null,
      renderData: null,
      renderEmployeeData: null,
      consReview: null,
      prosReview: null,
      reviewTitle: null,
      userId: '',
      helpfulPoints: 0
    }
    this.getCompanyInfo = this.getCompanyInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitApp = this.submitApp.bind(this);
    this.handleChangeForModalTitle = this.handleChangeForModalTitle.bind(this);
    this.handleChangeForModalDate = this.handleChangeForModalDate.bind(this);
    this.handleChangeForModalInterviewProcess = this.handleChangeForModalInterviewProcess.bind(this);
    this.handleChangeForModalInterviewQuestion = this.handleChangeForModalInterviewQuestion.bind(this);
    this.retrieveDataFromDB = this.retrieveDataFromDB.bind(this);

    this.openTheModal = this.openTheModal.bind(this);
    this.afterOpenTheModal = this.afterOpenTheModal.bind(this);
    this.closeTheModal = this.closeTheModal.bind(this);

    this.handleChangeForModalReviewTitle = this.handleChangeForModalReviewTitle.bind(this);
    this.handleChangeForModalPros = this.handleChangeForModalPros.bind(this);
    this.handleChangeForModalCons = this.handleChangeForModalCons.bind(this);
    this.employeeReviewForm = this.employeeReviewForm.bind(this);
    this.getEmployeeInfo = this.getEmployeeInfo.bind(this);
    this.addStars = this.addStars.bind(this);
    this.addStarsForEmployee = this.addStarsForEmployee.bind(this);
    this.starNumber = 0;
    this.starNumberForemployee = 0;
    this.$element;
    var context = this;
    $(function() {
      $(document).on('click', '.rating span.star', function() {

        var total=$(this).parent().children().length;
        var clickedIndex=$(this).index();
        $('.rating span.star').removeClass('filled');
        for(var i=clickedIndex;i<total;i++) {
          $('.rating span.star').eq(i).addClass('filled');
        }

      });
    })
  }
  addStars() {
    var context = this;
    $(function() {

      $(document).on('click', '.rate', function() {
        var contextClick = this;
        context.$element = $(this)[0].classList[0];
        var $stars = $(this)[0].classList[0];
        console.log('star that was selected', $stars)
        if (Number($stars[$stars.length-1]) === 1 ) {
          context.starNumber = $stars[$stars.length-1];
          console.log($stars[$stars.length-1])
          $(this).remove($(this)[0].classList[0]);

        } else if (Number($stars[$stars.length-1]) === 2) {
                    console.log('2222')
          context.starNumber = $stars[$stars.length-1];

          $(this).remove($(this)[0].classList[0]);

        } else if(Number($stars[$stars.length-1]) === 3) {
                    console.log('33333')
          context.starNumber = $stars[$stars.length-1];

          $(this).remove($(this)[0].classList[0]);
        } else if (Number($stars[$stars.length-1]) === 4) {
                    console.log('444444')
          context.starNumber = $stars[$stars.length-1];

          $(this).remove($(this)[0].classList[0]);
        } else if (Number($stars[$stars.length-1]) === 5) {
                    console.log('555555')
          context.starNumber = $stars[$stars.length-1];

          $(this).remove($(this)[0].classList[0]);
        }
      })
    })
  }
  addStarsForEmployee() {
    var context = this;
    $(function() {

      $(document).on('click', '.rateForEmployee', function() {
        context.$element = $(this)[0].classList[0];
        var $stars = $(this)[0].classList[0];
        console.log('star that was selected', $(this)[0].classList)
        if (Number($stars[$stars.length-1]) === 1 ) {
          context.starNumberForemployee = $stars[$stars.length-1];
          console.log('11111')
          // $('.rateForEmployee').attr('content','\2605');
          $(this).remove($(this)[0].classList[0]);

        } else if (Number($stars[$stars.length-1]) === 2) {
                    console.log('2222')
          context.starNumberForemployee = $stars[$stars.length-1];

          $(this).remove($(this)[0].classList[0]);

        } else if(Number($stars[$stars.length-1]) === 3) {
                    console.log('33333')
          context.starNumberForemployee = $stars[$stars.length-1];

          $(this).remove($(this)[0].classList[0]);
        } else if (Number($stars[$stars.length-1]) === 4) {
                    console.log('444444')
          context.starNumberForemployee = $stars[$stars.length-1];

          $(this).remove($(this)[0].classList[0]);
        } else if (Number($stars[$stars.length-1]) === 5) {
                    console.log('555555')
          context.starNumberForemployee = $stars[$stars.length-1];

          $(this).remove($(this)[0].classList[0]);
        }
      })
    })
  }
  handleChangeForModalCons(event) {
    this.setState({

      consReview: event.target.value
    })
  }

  handleChangeForModalPros(event) {
    this.setState({

      prosReview: event.target.value
    })
  }

  handleChangeForModalReviewTitle(event) {
    this.setState({

      reviewTitle: event.target.value
    })
  }
  employeeReviewForm(event) {
    var context = this;
    event.preventDefault();
    var employee = {id:Math.floor(Math.random()* 900000000), name: this.state.value, countOfReviews: this.starNumberForemployee ,employeeComments: [{reviewTitle: this.state.reviewTitle}, {consReview:this.state.consReview},{prosReview:this.state.prosReview}], imgUrl:this.state.companyInfo[0].squareLogo, helpfulButtonScore:'helpful(0)', userInfo:[], singleUl:''}
    $.ajax({
      method: 'POST',
      url:'/api/employeeReviews',
      contentType:'application/json',
      data: JSON.stringify(employee),
      success: function(data) {
        context.getEmployeeInfo();
      },
      error: function(err) {
        console.log('You have an error', err);
      } 
    })
    this.closeTheModal();
  }
  show(){
    this.setState({hidden : true});
  }
  getEmployeeInfo() { 
    var context = this;
    var name = this.state.value;
    $.ajax({
      method:'GET',
      url:'/api/employeeReviews?name='+ name,
      contentType: 'application/json',
      success: function(data) {
        console.log('employee----data', data);
        context.setState({
          renderEmployeeData: data
        })
        console.log('is the state updated?', context.state.renderEmployeeData);
      },
      error: function(err) {
        console.log('You have an error', err)
      }
    })
  }

  getCompanyInfo(event) {
    event.preventDefault();
    this.retrieveDataFromDB();
    this.getEmployeeInfo();
    var context = this;
    console.log('this is the state value' ,this.state.value)
    $.ajax({
      method:'GET',
      url:'/api/company?company='+ this.state.value,
      contentType: 'application/json',
      success: function(data) {
        console.log('User IDIDIDIDIDDD', typeof data[2])
        context.setState({
          companyInfo: data[0],
          companyView: data[1],
          userId: data[2]
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
    $(function() {
      $('.ratingStar').append('<span class="rating"><span class="five5 rate star"></span><span class="four4 rate star "></span><span class="three3 rate star"></span><span class="two2 rate star filled"></span><span class=" first1 rate star filled"></span></span>');

      // $('.ratingStar').append("<span class='first1 rate'>&#9734</span><span class='two2 rate'>&#9734</span><span class='three3 rate'>&#9734</span><span class='four4 rate'>&#9734</span><span class='five5 rate'>&#9734</span>");
    })
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



  openTheModal() {
    this.setState({modalOpen: true});
    $(function() {

      $('.ratingStar').append('<span class="rating"><span class="five5 rateForEmployee star"></span><span class="four4 rateForEmployee star "></span><span class="three3 rateForEmployee star"></span><span class="two2 rateForEmployee star filled"></span><span class=" first1 rateForEmployee star filled"></span></span>');
    })
  }
  afterOpenTheModal() {
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = '#f00';
    // this.refs.testingthis.style = 'color: orange; font-weight: bold;';
  }
  closeTheModal() {
    this.setState({
      modalOpen: false,
    });
  }

  retrieveDataFromDB() {
    var context = this;
    var name = this.state.value;
    $.ajax({
      method:'GET',
      url:'/api/interviewreview?name='+ name,
      contentType: 'application/json',
      success: function(data) {

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
    var interviewCompany = {id:Math.floor(Math.random()* 900000000), name: this.state.value, imgUrl:this.state.companyInfo[0].squareLogo,countOfReviews: this.starNumber ,helpfulButtonScore:'helpful(0)',singleUl:'',companyComments: [{jobTitle:this.state.title},{date:this.state.date},{interviewProcess:{descriptionOfinterview:this.state.interviewProcess,interviewQuestion:this.state.interviewQuestion }}]};
    var context = this;
    $.ajax({
      method:'POST',
      url:'/api/interviewreview',
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
    this.addStars();
    this.addStarsForEmployee();
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
                <div className="ratingStar">
                  <p>Overall Rating</p>
                </div>
                <input type='submit' className='add-small' value='Submit Interview' />
              </form>
            </div>

          </div>

        </Modal>

        <Modal
          isOpen={this.state.modalOpen}
          onAfterOpen={this.afterOpenTheModal}
          onRequestClose={this.closeTheModal}
          contentLabel="Example Modal"
          className="modal-content"
          overlayClassName="modal-overlay"
        >

          <div className="inner-container">
            <div className='desc-header'>
              Employee Review Below:
            </div>
            <div className='add-app-container'>
              <form id="add-app-form" onSubmit={this.employeeReviewForm}>
                Review Title<br />
                <input type='text' name='title' onChange={this.handleChangeForModalReviewTitle} required/><br />
                Pros<br />
                <input type='text' name='Pros' onChange={this.handleChangeForModalPros} required/><br />
                Cons<br />
                <textarea name='description' form='add-app-form' placeholder='Enter a Comment ...' onChange={this.handleChangeForModalCons}required></textarea><br />
                <div className="ratingStar">
                  <p>Overall Rating</p>
                </div>
                <input type='submit' className='add-small' value='Submit Review' />
              </form>
            </div>

          </div>

        </Modal>
        <div className="item animated fadeInDownBig  newDiv">
          {this.state.renderData !== null ? <InterviewReviews userId={this.state.userId} renderData={this.state.renderData} imgUrl={this.state.hidden? this.state.companyInfo[0].squareLogo : null} companyName={this.state.value} retrieveDataFromDB={this.retrieveDataFromDB}/>: null }
        </div>

        <div className="item animated fadeInDownBig  employeeReview">
         {this.state.renderEmployeeData !== null ? <EmployeeReview helpfulPoints={this.state.helpfulPoints} imgUrl={this.state.hidden? this.state.companyInfo[0].squareLogo : null} userId={this.state.userId} renderEmployeeData={this.state.renderEmployeeData}/> : null}
        </div>

        <div className="item animated fadeInDownBig  employeeReview">

          <br /> <br />Work at {this.state.value}? Share Your Experience<br /> <br />
          {immg} <div id="stars">
          </div> <br/> <br />
          <textarea type='submit' className="textareas" value='Start Your Review Here ..' onClick={this.openTheModal}></textarea>
        </div>

        <div className="item animated fadeInDownBig  newDiv">

        <br /> <br />Work at {this.state.value}? Share Your Experience<br /> <br />
        {immg} <div id="stars">
          </div> <br/> <br />
          <textarea type='submit' className="textareas" value='Start Your Review Here ..' onClick={this.openModal}></textarea>
        </div>
      </div>
    )
  }
}