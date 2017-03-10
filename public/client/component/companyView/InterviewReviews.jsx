import React from 'react';
import $ from 'jQuery';
import Modal from 'react-modal';
import axios from 'axios';


export default class InterviewReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      date1: null,
      interviewProcess1: null,
      interviewQuestion1: null,
      title1: null,
      count: true
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.handleChangeForModalTitle1 = this.handleChangeForModalTitle1.bind(this);
    this.handleChangeForModalDate1 = this.handleChangeForModalDate1.bind(this);
    this.handleChangeForModalInterviewProcess1 = this.handleChangeForModalInterviewProcess1.bind(this);
    this.handleChangeForModalInterviewQuestion1 = this.handleChangeForModalInterviewQuestion1.bind(this);
    this.editReview = this.editReview.bind(this);
    this.sendUpdatedData = this.sendUpdatedData.bind(this);
    this.arrayOfinputs = [];
    this.importantId = '';
    this.helpfulCheckpoint = {};
    this.produceStars = this.produceStars.bind(this);
    this.editStarsForInterview = this.editStarsForInterview.bind(this);
    this.eidtStarCount = 0;
    this.dateChecker = true;
    // this.setState({helpfulCheckpoint:this.helpfulCheckpoint[this.props.userId] = true})

    var context = this;

    $(function() {
      $(document).on('click', '.helpfulPointsForInterview', function() {
        var secondContext = this;
        var id = $(this).parent()[0].children[1].classList[0];
        console.log('This is parent', $(this).parent()[0].children);
        $.ajax({
            method: 'GET',
            url: '/api/buttonsInfoForInterview?name='+ id,
            contentType:'application/json',
            success: function(data) {
              console.log('hers is a single data ', data);
              var existUser = false;
              // console.log(data[0].length)
              for (var i = 0; i < data[0].userInfo.length; i++) {
                // console.log('result ',data[0][i].context.props.userId === context.props.userId)
                if (data[0].userInfo[i][context.props.userId] === context.props.userId) {
                  existUser = true;
                }
              }
              console.log('existUser should be true', existUser);
              if (existUser === false) {
                console.log('I came to create a new click')

                context.helpfulCheckpoint[context.props.userId] = context.props.userId;
                // console.log('I am console logging the helpfulCheckpoint', context.helpfulCheckpoint)

                var $buttonValue = 'Helpful (' + (Number($(secondContext).val().match(/[0-9]/g)[0]) + 1) +')';

                $(secondContext).val($buttonValue);

                $(secondContext).removeClass($(secondContext)[0].classList[0]);
                var buttonData = [$(secondContext).val(), $(secondContext).parent()[0].children[1].classList[0], context.helpfulCheckpoint, $(secondContext).parent()[0].children[0].classList[0] ]
                $.ajax({
                    method: 'POST',
                    url: '/api/updateHelpfulButtonForInterview',
                    contentType:'application/json',
                    data: JSON.stringify(buttonData),
                    success: function(data) {

                    }, 
                    error: function(err) {
                    console.log('You have an error', err);
                  } 
                })
              
              } else if (existUser === true) {

                alert('You already clicked me dude');
              }
            }, 
            error: function(err) {
            console.log('You have an error', err);
          } 
        })
     })
    })
  }

  editStarsForInterview() {
    var context = this;
    $(function() {

      $(document).on('click', '.Editrate', function() {
        context.$element = $(this)[0].classList[0];
        var $stars = $(this)[0].classList[0];
        console.log('star that was selected', $(this)[0].classList)
        if (Number($stars[$stars.length-1]) === 1 ) {
          context.eidtStarCount  = $stars[$stars.length-1];
          console.log('11111')
          // $('.rateForEmployee').attr('content','\2605');
          $(this).remove($(this)[0].classList[0]);

        } else if (Number($stars[$stars.length-1]) === 2) {
                    console.log('2222')
          context.eidtStarCount  = $stars[$stars.length-1];

          $(this).remove($(this)[0].classList[0]);

        } else if(Number($stars[$stars.length-1]) === 3) {
                    console.log('33333')
          context.eidtStarCount  = $stars[$stars.length-1];

          $(this).remove($(this)[0].classList[0]);
        } else if (Number($stars[$stars.length-1]) === 4) {
                    console.log('444444')
          context.eidtStarCount  = $stars[$stars.length-1];

          $(this).remove($(this)[0].classList[0]);
        } else if (Number($stars[$stars.length-1]) === 5) {
                    console.log('555555')
          context.eidtStarCount  = $stars[$stars.length-1];

          $(this).remove($(this)[0].classList[0]);
        }
      })
    })
  }
  editReview() {
    var context = this;
    var $ele;
    $(function() {
      $(document).on('click', '.editReview', function() { 
        $ele = this;
        context.importantId = $(this).parent()[0].children[1].classList[0];
        console.log('Those are the children of the edit', $(this).parent()[0].children)
        context.arrayOfinputs = [ 
          $(this).parent()[0].children[0], 
          $(this).parent()[0].children[1].innerText.split(':')[1],
          $(this).parent()[0].children[2].innerText.split(':')[1],
          $(this).parent()[0].children[3].innerText.split(':')[1],
          $(this).parent()[0].children[4].innerText.split(':')[1],
          $(this).parent()[0].children[6]
        ]
        context.openModal(context.arrayOfinputs);
      })
      $(document).on('submit', '#editInterivew', function(event) { 
        event.preventDefault();
        console.log('Lets see true or false', context.dateChecker)
        if (!context.dateChecker) {
          alert('Please insert a vaild date i.e MM/DD/YYYY');
        } else {
          // context.dateChecker = true;
//<div className={filed.id + ' review-item'}><strong>Job Interviewed For:</strong> {filed.companyComments[0].jobTitle}</div>
console.log('This is the importantId', context.importantId)
        if (!context.state.title1) {
          var $liJobTitle = "<div class="+context.importantId+' '+'review-item'+ ">Job Interviewed For:"+ context.arrayOfinputs[1] +"</div>";
          context.setState({
            title1: context.arrayOfinputs[1]
          })
        } else {
          var $liJobTitle = "<div class="+context.importantId+' '+'review-item'+">Job Interviewed For:"+ context.state.title1 +"</div>";
        }
// <div className='review-item'><strong>Date of Interview:</strong> {filed.companyComments[1].date}</div>

         if (!context.state.date1) {
          var $liJobDate = "<div class='review-item'>Date of Interview:"+ context.arrayOfinputs[2] +"</div>";
          context.setState({
            date1: context.arrayOfinputs[2]
          })
        } else {
          var $liJobDate = "<div class='review-item'>Date of Interview:"+ context.state.date1 +"</div>";
        }
// <div className='review-item'>Description of Interview:<div className='review-sub'>{filed.companyComments[2].interviewProcess.descriptionOfinterview}</div></div>

        if (!context.state.interviewProcess1) {
          var $liJobInterviewProcess = "<div class='review-item'>Description of Interview:<div class='review-sub'>"+ context.arrayOfinputs[3] +"</div></div>";
          context.setState({
            interviewProcess1: context.arrayOfinputs[3]
          })
        } else {
          var $liJobInterviewProcess = "<div class='review-item'>Description of Interview:<div class='review-sub'>"+ context.state.interviewProcess1 +"</div></div>";
        }
//<div className='review-item'><Interview Questions:<div className='review-sub'>{filed.companyComments[2].interviewProcess.interviewQuestion}</div></div>

         if (!context.state.interviewQuestion1) {
          var $liJobInterviewQuestion = "<div class='review-item'>Interview Questions:<div class='review-sub'>"+ context.arrayOfinputs[4] +"</div></div>";
          context.setState({
            interviewQuestion1: context.arrayOfinputs[4]
          })
        } else {
          var $liJobInterviewQuestion = "<div class='review-item'>Interview Questions:<div class='review-sub'>"+ context.state.interviewQuestion1 +"</div></div>";
        }
        var logoImage = '<img src='+context.props.imgUrl +' '+'class="companyImg"/>'
        var $button = "<button class='editReview'>Edit the Review</button>";



        if (Number(context.eidtStarCount) === 0) {
            var editCountStar = context.arrayOfinputs[0].children.length-1;
            if (editCountStar === 1) {
              var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" />';
            } else if (editCountStar === 2) {
              var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" />';
            } else if (editCountStar === 3) {
              var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" />';
            } else if (editCountStar === 4) {
              var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" />';
            } else if (editCountStar === 5) {
              var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" />';
            }
        } else {
          var editCountStar = Number(context.eidtStarCount);
            if (editCountStar === 1) {
              var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" />';
            } else if (editCountStar === 2) {
              var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" />';
            } else if (editCountStar === 3) {
              var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" />';
            } else if (editCountStar === 4) {
              var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" />';
            } else if (editCountStar === 5) {
              var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" />';
            }
        }
        console.log('this should be the value of the input', context.arrayOfinputs[5].value)

        var helpfulButton = '<input type="button" value='+context.arrayOfinputs[5].value.replace(/[' ']/g, '') +' '+'class="helpfulPointsForInterview"/>';
        /*
          <div lassName="changeStarRating">
            <strong>Overall Rating: </strong>
            {
              this.produceStars(filed.countOfReviews).map((ele, indx) =>
                <img key={indx} className="roundstar" src='roundstar1.png' />
              )
            }
         </div>

        */
        var $editStarElementList = '<div class="changeStarRating"><strong>Overall Rating: </strong>'+ $editStarElement + '</div>';
        // console.log('new star ratings', editCountStar)
        $($ele).parent().html($editStarElementList+$liJobTitle+$liJobDate+$liJobInterviewProcess+$liJobInterviewQuestion+ $button+helpfulButton);
        // $($ele).parent().html($liJobTitle+$liJobDate+$liJobInterviewProcess+$liJobInterviewQuestion+ $editStarElementList + $button+helpfulButton);
        context.closeModal();
        // console.log('This is the name of the company', context.props.companyName)
        var updatedData = {name: context.props.companyName, imgUrl:context.props.imgUrl ,countOfReviews: editCountStar, companyComments: [{jobTitle:context.state.title1},{date:context.state.date1},{interviewProcess:{descriptionOfinterview:context.state.interviewProcess1, interviewQuestion:context.state.interviewQuestion1}}]};
        var dataToSend = [updatedData, context.importantId];
        context.sendUpdatedData(dataToSend);
      }
      })
    })
  }
  sendUpdatedData(dataToSend){
    var context = this;

    axios.post('/api/updateMongoDB',dataToSend)
    .then(function (response) {
      context.props.retrieveDataFromDB()
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    // $.ajax({
    //   method: 'POST',
    //   url:'http://localhost:3000/api/updateMongoDB',
    //   contentType:'application/json',
    //   data:JSON.stringify(dataToSend),
    //   success: function(data) {
    //     context.props.retrieveDataFromDB()
    //   },
    //   error: function(err) {
    //     console.log('You have an error', err)
    //   }
    // })
  }
  openModal(text) {
    console.log(text)
    if (text) {
      this.setState({modalIsOpen: true});
      $('.jobTitle').val(text[1])
      $('.date').val(text[2]); 
      $('.interviewProcess').val(text[3]); 
      $('.interviewQuestion').val(text[4]); 
    }
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
  handleChangeForModalDate1(event) {

    if (this.props.validateDate(event.target.value.replace(/[' ']/g, ''))) {
      console.log('I came to the true regx function')
      this.dateChecker = true;
    } else {
      console.log('I came to the false regx function')
      this.dateChecker = false;
    }
    this.setState({
      date1: event.target.value
    });
  }
  handleChangeForModalTitle1(event){
    this.setState({
      title1: event.target.value
    });
  }
  handleChangeForModalInterviewProcess1(event){
    this.setState({
      interviewProcess1: event.target.value
    });
  }
  handleChangeForModalInterviewQuestion1(event){
    this.setState({
      interviewQuestion1: event.target.value
    });
  }
  produceStars(num) {
    var array = [];
    for (var i = 0; i < Number(num); i++) {
      array.push(i);
    }
    return array;
  }
  componentDidMount() {
    this.editReview();
    this.editStarsForInterview();
  }
  render() {
    return(
      <div id="comments"> 
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
              Edit Interview Review Below:
            </div>
            <div className='add-app-container'>
              <form className="add-app-form1" id="editInterivew">
                Job Title<br />
                <input type='text' name='title' className='jobTitle' placeholder='i.e Frontend Developer..' onChange={this.handleChangeForModalTitle1} required/><br />
                Date<br />
                <input type='text' name='company' className='date' placeholder='i.e MM/DD/YYYY' onChange={this.handleChangeForModalDate1} required/><br />
                Describe the Interview Process<br />
                <textarea name='description' form='add-app-form1' className='interviewProcess' placeholder='Enter a Comment ...' onChange={this.handleChangeForModalInterviewProcess1}required></textarea><br />
                Interview Question<br />
                <textarea name='description' form='add-app-form1' className='interviewQuestion' placeholder='Enter a Comment ...' onChange={this.handleChangeForModalInterviewQuestion1}required></textarea><br />
                 <div className="editRatingStar">
                  <p>Overall Rating</p>
                  <span className="rating"><span className="five5 Editrate star"></span><span className="four4 Editrate star "></span><span className="three3 Editrate star"></span><span className="two2 Editrate star filled"></span><span className=" first1 Editrate star filled"></span></span>
                </div>
                <input type='submit' className='add-small' value='Save Changes' />
              </form>
            </div>

          </div>

        </Modal>
      {
        this.props.renderData.map((filed, index) => 
        <div key={index} className={`comments addStar ${index}`}>
          <div className="changeStarRating">
            <strong>Overall Rating: </strong>
            {
              this.produceStars(filed.countOfReviews).map((ele, indx) =>
                <img key={indx} className="roundstar" src='roundstar1.png' />
              )
            }
         </div>
         <div className={filed.id +' '+'review-item'}><strong>Job Interviewed For:</strong> {filed.companyComments[0].jobTitle}</div>
         <div className='review-item'><strong>Date of Interview:</strong>{filed.companyComments[1].date}</div>
         <div className='review-item'><strong>Description of Interview:</strong><div className='review-sub'>{filed.companyComments[2].interviewProcess.descriptionOfinterview}</div></div>
         <div className='review-item'><strong>Interview Questions:</strong><div className='review-sub'>{filed.companyComments[2].interviewProcess.interviewQuestion}</div></div>
       {filed.userId === this.props.userId ? <button className="editReview">Edit the Review</button> : null}
          <input type="button" className={`helpfulPointsForInterview ${index}`} value={`${filed.helpfulButtonScore}`}/>
        </div>
        )
      }
      </div>
    )
  }
}