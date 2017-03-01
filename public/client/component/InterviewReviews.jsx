import React from 'react';
import $ from 'jQuery';
import Modal from 'react-modal';


export default class InterviewReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      discription1: null,
      date1: null,
      interviewProcess1: null,
      interviewQuestion1: null,
      title1: null
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.handleChangeForModalDescriptionA1 = this.handleChangeForModalDescriptionA1.bind(this);
    this.handleChangeForModalTitle1 = this.handleChangeForModalTitle1.bind(this);
    this.handleChangeForModalDate1 = this.handleChangeForModalDate1.bind(this);
    this.handleChangeForModalInterviewProcess1 = this.handleChangeForModalInterviewProcess1.bind(this);
    this.handleChangeForModalInterviewQuestion1 = this.handleChangeForModalInterviewQuestion1.bind(this);
    this.editReview = this.editReview.bind(this);
    this.sendUpdatedData = this.sendUpdatedData.bind(this);
    this.arrayOfinputs = [];
    this.importantId = '';
  }
  editReview() {
    var context = this;
    var $ele;
    $(function() {
      $(document).on('click', '.editReview', function() { 
        $ele = this;
        console.log('ululul',typeof $(this).parent()[0].children[0].classList[0])
        context.importantId = $(this).parent()[0].children[0].classList[0];
        context.arrayOfinputs = [ 
          $(this).parent()[0].children[0].innerText, 
          $(this).parent()[0].children[1].innerText,
          $(this).parent()[0].children[2].innerText,
          $(this).parent()[0].children[3].innerText,
          $(this).parent()[0].children[4].innerText
        ]
        context.openModal(context.arrayOfinputs);
      })
      $(document).on('submit', '.add-app-form1', function(event) { 
        event.preventDefault();
        if (!context.state.title1) {
          var $liJobTitle = "<li>"+ context.arrayOfinputs[0] +"</li>";
          context.setState({
            title1: context.arrayOfinputs[0]
          })
        } else {
          var $liJobTitle = "<li>"+ context.state.title1 +"</li>";
        }
         if (!context.state.date1) {
          var $liJobDate = "<li>"+ context.arrayOfinputs[1] +"</li>";
          context.setState({
            date1: context.arrayOfinputs[1]
          })
        } else {
          var $liJobDate = "<li>"+ context.state.date1 +"</li>";
        }
        if (!context.state.interviewProcess1) {
          var $liJobInterviewProcess = "<li>"+ context.arrayOfinputs[2] +"</li>";
          context.setState({
            interviewProcess1: context.arrayOfinputs[2]
          })
        } else {
          var $liJobInterviewProcess = "<li>"+ context.state.interviewProcess1 +"</li>";
        }
         if (!context.state.interviewQuestion1) {
          var $liJobInterviewQuestion = "<li>"+ context.arrayOfinputs[3] +"</li>";
          context.setState({
            interviewQuestion1: context.arrayOfinputs[3]
          })
        } else {
          var $liJobInterviewQuestion = "<li>"+ context.state.interviewQuestion1 +"</li>";
        }
        if(!context.state.discription1) {
          var $liJobTitleInterviewQAnswer = "<li>"+ context.arrayOfinputs[4]+"</li>";
          context.setState({
            discription1: context.arrayOfinputs[4]
          })
        } else {
          var $liJobTitleInterviewQAnswer = "<li>"+ context.state.discription1 +"</li>";
        }

        var $button = "<button class='editReview'>Edit the Review</button>"

        // console.log('2fdsdfsadfsafdsa', $($ele).parent())
        $($ele).parent().html($liJobTitle+$liJobDate+$liJobInterviewProcess+$liJobInterviewQuestion+$liJobTitleInterviewQAnswer+$button);
        context.closeModal();
        console.log('lets see what is in you',context.arrayOfinputs)
        var updatedData = {name: context.props.companyName, imgUrl:context.props.imgUrl ,companyComments: [{jobTitle:context.state.title1},{date:context.state.date1},{interviewProcess:{descriptionOfinterview:context.state.interviewProcess1, interviewQuestion:context.state.interviewQuestion1, interviewProcess:context.state.description1}}]};
        var oldData = {name: context.props.companyName, imgUrl:context.props.imgUrl ,companyComments: [{jobTitle:context.arrayOfinputs[0]},{date:context.arrayOfinputs[1]},{interviewProcess:{descriptionOfinterview:context.arrayOfinputs[2],interviewQuestion: context.arrayOfinputs[3],interviewProcess:context.arrayOfinputs[4]}}]};
        // console.log('ooooolld',oldData);
        // console.log('neweeee', updatedData);
        var dataToSend = [updatedData, context.importantId];
        context.sendUpdatedData(dataToSend);
      })
    })
  }
  sendUpdatedData(dataToSend){
    var context = this;
    $.ajax({
      method: 'POST',
      url:'http://localhost:3000/api/updateMongoDB',
      contentType:'application/json',
      data:JSON.stringify(dataToSend),
      success: function(data) {
        context.props.retrieveDataFromDB()
      },
      error: function(err) {
        console.log('You have an error', err)
      }
    })
  }
  openModal(text) {
    console.log(text)
    if (text) {
      this.setState({modalIsOpen: true});
      $('.jobTitle').val(text[0])
      $('.date').val(text[1]); 
      $('.interviewProcess').val(text[2]); 
      $('.interviewQuestion').val(text[3]); 
      $('.interviewAnswer').val(text[4]); 
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
  handleChangeForModalDescriptionA1(event){
    this.setState({
      discription1: event.target.value
    });
  }
  handleChangeForModalDate1(event){
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

  render() {
    this.editReview()
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
              Add an Interview Review Below:
            </div>
            <div className='add-app-container'>
              <form className="add-app-form1">
                Job Title<br />
                <input type='text' name='title' className='jobTitle' placeholder='i.e Frontend Developer..' onChange={this.handleChangeForModalTitle1} required/><br />
                Date<br />
                <input type='text' name='company' className='date' placeholder='i.e 03/20/2017' onChange={this.handleChangeForModalDate1} required/><br />
                Describe the Interview Process<br />
                <textarea name='description' form='add-app-form1' className='interviewProcess' placeholder='Enter a Comment ...' onChange={this.handleChangeForModalInterviewProcess1}required></textarea><br />
                Interview Questions<br />
                <textarea name='description' form='add-app-form1' className='interviewQuestion' placeholder='Enter a Comment ...' onChange={this.handleChangeForModalInterviewQuestion1}required></textarea><br />
                <textarea name='description' form='add-app-form1' className='interviewAnswer' placeholder='Enter a Comment ...' onChange={this.handleChangeForModalDescriptionA1} required></textarea><br />
                <input type='submit' className='add-small' value='Save Changes' />
              </form>
            </div>

          </div>

        </Modal>
        <img className="companyImg" src={this.props.imgUrl}/>
      {
        this.props.renderData.map((filed, index) =>
        <ul key={index} className="comments">
          <li className={filed.id}>{filed.companyComments[0].jobTitle}</li>
          <li>{filed.companyComments[1].date}</li>
          <li>{filed.companyComments[2].interviewProcess.descriptionOfinterview}</li>
          <li>{filed.companyComments[2].interviewProcess.interviewQuestion}</li>
          <li>{filed.companyComments[2].interviewProcess.interviewProcess}</li>
          <button className="editReview">Edit the Review</button>
        </ul>
        )
      }
      </div>
    )
  }
}