import React from 'react';
import $ from 'jQuery';
import Modal from 'react-modal';


export default class EmployeeReview extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      editReviewTitle: null,
      editConsReview: null,
      eidtProsReview: null
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.editEmployeeReviewForm = this.editEmployeeReviewForm.bind(this);
    this.editHandleChangeForModalReviewTitle = this.editHandleChangeForModalReviewTitle.bind(this);
    this.editHandleChangeForModalPros = this.editHandleChangeForModalPros.bind(this);
    this.editHandleChangeForModalCons = this.editHandleChangeForModalCons.bind(this);
    this.editEmployeeInfo = this.editEmployeeInfo.bind(this);
    this.sendUpdatedEmployeeData = this.sendUpdatedEmployeeData.bind(this);

    this.arrayOfinputs = [];
    this.idForUpdateDB = '';
    this.$ele = null;
  }
  openModal(array) {
    this.setState({modalIsOpen: true});
    $('.reviewTitle').val(array[0])
    $('.pros').val(array[1]); 
    $('.cons').val(array[2]); 
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

  editEmployeeReviewForm(event) {
    event.preventDefault();
    console.log('my array of inputs', this.arrayOfinputs)
    if (!this.state.editReviewTitle) {
      var $editReviewTitle = '<li>' + this.arrayOfinputs[0] + '</li>';
      var reviewTitle = {reviewTitle:this.arrayOfinputs[0]};

      this.setState({
        editReviewTitle: this.arrayOfinputs[0]
      })
    } else {
      var $editReviewTitle = '<li>' + this.state.editReviewTitle + '</li>';
      var reviewTitle = {reviewTitle: this.state.editReviewTitle}
    }

    if (!this.state.eidtProsReview) {
      var $eidtProsReview = '<li>' + this.arrayOfinputs[1] + '</li>';
      var prosReview = {prosReview: this.arrayOfinputs[1]};

      this.setState({
        eidtProsReview: this.arrayOfinputs[1]
      })
    } else {
      var $eidtProsReview = '<li>' + this.state.eidtProsReview + '</li>';
      var prosReview = {prosReview: this.state.eidtProsReview};
    }

    if(!this.state.editConsReview) {
      var $editConsReview = '<li>' + this.arrayOfinputs[2] + '</li>';
      var consReview = {consReview: this.arrayOfinputs[2]};
      this.setState({
        editConsReview: this.arrayOfinputs[2]
      })
    } else {
      var $editConsReview = '<li>' + this.state.editConsReview + '</li>';
      var consReview = {consReview: this.state.editConsReview}
    }


    var $button = '<button class="editEmployeeReview" >Edit the Review</button>';

    $(this.$ele).parent().html($editReviewTitle+$eidtProsReview+$editConsReview+$button);
    this.closeModal();
    var updatedEmployeeData = [reviewTitle, consReview, prosReview]
    this.sendUpdatedEmployeeData([updatedEmployeeData, this.idForUpdateDB]);
  }

  sendUpdatedEmployeeData(data) {
    var context = this;
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/updateEmployeeReview',
      contentType:'application/json',
      data: JSON.stringify(data),
      success: function(data) {
      }, 
      error: function(err) {
        console.log('You have an error', err);
      } 
    })
  }

  editHandleChangeForModalReviewTitle(event) {
    this.setState({
      editReviewTitle: event.target.value
    })

  }
  editHandleChangeForModalPros(event) {
    this.setState({

      eidtProsReview: event.target.value
    })
  }
  editHandleChangeForModalCons(event) {
    this.setState({

      editConsReview: event.target.value
    })
  }

  editEmployeeInfo() {
    var context = this;
    $(function() {
      $(document).on('click', '.editEmployeeReview', function() { 
        context.idForUpdateDB = $(this).parent()[0].children[0].classList[0];
        context.$ele = this;
        console.log('Check if the className is correct', $(this).parent()[0].children[0].classList[0])

        context.arrayOfinputs = [ 
          $(this).parent()[0].children[0].innerText, 
          $(this).parent()[0].children[1].innerText,
          $(this).parent()[0].children[2].innerText,
        ]
        context.openModal(context.arrayOfinputs);
      })
    })
  }
  render() {
    this.editEmployeeInfo();
    return (
      <div>
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
              Edit an Interview Review Below:
            </div>
            <div className='add-app-container'>
              <form id="add-app-form" onSubmit={this.editEmployeeReviewForm}>
                Review Title<br />
                <input type='text' name='title' className='reviewTitle' onChange={this.editHandleChangeForModalReviewTitle} required/><br />
                Pros<br />
                <input type='text' name='Pros' className='pros' onChange={this.editHandleChangeForModalPros} required/><br />
                Cons<br />
                <textarea name='description' form='add-app-form' className='cons' placeholder='Enter a Comment ...' onChange={this.editHandleChangeForModalCons}required></textarea><br />
                <div className="ratingStar">
                  <p>Overall Rating</p>
                </div>
                <input type='submit' className='add-small' value='Submit Review' />
              </form>
            </div>

          </div>

        </Modal>
        {
        this.props.renderEmployeeData.map((filed, index) =>
        <ul key={index} className={`comments addStar ${index}`}>
          <li className={filed.id}>{filed.employeeComments[0].reviewTitle}</li>
          <li>{filed.employeeComments[1].consReview}</li>
          <li>{filed.employeeComments[2].prosReview}</li>
          <button className="editEmployeeReview" >Edit the Review</button>
          <input type="button" value="helpful(0)" className={`helpfulPoints ${index}`}/>

        </ul>
        
        )
      }
      </div>
    )
  }
}