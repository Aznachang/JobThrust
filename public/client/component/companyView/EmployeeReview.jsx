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
    this.produceStarsForEmployee = this.produceStarsForEmployee.bind(this);
    this.editStarsForEmployee = this.editStarsForEmployee.bind(this);

    this.arrayOfinputs = [];
    this.idForUpdateDB = '';
    this.$ele = null;
    this.helpfulCheckpoint = {};
    this.eidtStarCount = 0;
    // this.setState({helpfulCheckpoint:this.helpfulCheckpoint[this.props.userId] = true})

    var context = this;

    $(function() {
      $(document).on('click', '.helpfulPoints', function() {
        var secondContext = this;
        var id = $(this).parent()[0].children[0].classList[0];
        $.ajax({
            method: 'GET',
            url: '/api/buttonsInfo?name='+ id,
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
                var buttonData = [$(secondContext).val(), $(secondContext).parent()[0].children[0].classList[0], context.helpfulCheckpoint, $(secondContext).parent()[0].children[0].classList[0] ]
                $.ajax({
                    method: 'POST',
                    url: '/api/updateHelpfulButton',
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


  editStarsForEmployee() {
    var context = this;
    $(function() {

      $(document).on('click', '.EditrateEmployee', function() {
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
      var $editReviewTitle = '<p class='+ this.idForUpdateDB+'>Review Title:' + this.arrayOfinputs[0] + '</p>';
      var reviewTitle = {reviewTitle:this.arrayOfinputs[0]};

      this.setState({
        editReviewTitle: this.arrayOfinputs[0]
      })
    } else {
      var $editReviewTitle = '<p class='+ this.idForUpdateDB +'>Review Title:' + this.state.editReviewTitle + '</p>';
      var reviewTitle = {reviewTitle: this.state.editReviewTitle}
    }

    if (!this.state.eidtProsReview) {
      var $eidtProsReview = '<p>Cons:' + this.arrayOfinputs[1] + '</p>';
      var consReview = {consReview: this.arrayOfinputs[1]};

      this.setState({
        eidtProsReview: this.arrayOfinputs[1]
      })
    } else {
      var $eidtProsReview = '<p>Cons:' + this.state.eidtProsReview + '</p>';
      var consReview = {consReview: this.state.eidtProsReview};
    }

    if(!this.state.editConsReview) {
      var $editConsReview = '<p>Pros:' + this.arrayOfinputs[2] + '</p>';
      var prosReview = {prosReview: this.arrayOfinputs[2]};
      this.setState({
        editConsReview: this.arrayOfinputs[2]
      })
    } else {
      var $editConsReview = '<p>Pros:' + this.state.editConsReview + '</p>';
      var prosReview = {prosReview: this.state.editConsReview}
    }



    if (Number(this.eidtStarCount) === 0) {
        var editCountStar = this.arrayOfinputs[4].children.length;
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
      var editCountStar = Number(this.eidtStarCount);
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

    var $editStarElementList = '<p>'+ $editStarElement + '</p>';
    console.log('This should be the new stars update',$editStarElementList )
    var $button = '<button class="editEmployeeReview" >Edit the Review</button>';
    var logoImage = '<img src='+ this.props.imgUrl +' '+'class="companyImg"/>';
    var helpfulButton = '<input type="button" value='+ this.arrayOfinputs[4].value+' '+'class="helpfulPoints" />';

    $(this.$ele).parent().html($editReviewTitle+$eidtProsReview+$editConsReview+$editStarElementList+$button+logoImage+helpfulButton);
    this.closeModal();
    var updatedEmployeeData = [reviewTitle, consReview, prosReview]
    console.log('This is the updated version', updatedEmployeeData)
    this.sendUpdatedEmployeeData([updatedEmployeeData, this.idForUpdateDB, editCountStar]);
  }

  sendUpdatedEmployeeData(data) {
    var context = this;
    $.ajax({
      method: 'POST',
      url: '/api/updateEmployeeReview',
      contentType:'application/json',
      data: JSON.stringify(data),
      success: function(data) {
        context.props.retrieveDataFromDB()
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
        console.log('those are the children', $(this).parent()[0].children)

        context.arrayOfinputs = [ 
          $(this).parent()[0].children[0].innerText.split(':')[1], 
          $(this).parent()[0].children[1].innerText.split(':')[1],
          $(this).parent()[0].children[2].innerText.split(':')[1],
          $(this).parent()[0].children[3],
          $(this).parent()[0].children[6]
        ]
        context.openModal(context.arrayOfinputs);
      })
    })
  }
  produceStarsForEmployee(num) {
    var array = [];
    for (var i = 0; i < Number(num); i++) {
      array.push(i);
    }
    return array;
  }
  componentDidMount() {
    this.editEmployeeInfo();
    this.editStarsForEmployee();
  }
  render() {
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
              Edit Employee Review Below:
            </div>
            <div className='add-app-container'>
              <form id="add-app-form" onSubmit={this.editEmployeeReviewForm}>
                Review Title<br />
                <input type='text' name='title' className='reviewTitle' onChange={this.editHandleChangeForModalReviewTitle} required/><br />
                Pros<br />
                <input type='text' name='Pros' className='pros' onChange={this.editHandleChangeForModalPros} required/><br />
                Cons<br />
                <textarea name='description' form='add-app-form' className='cons' placeholder='Enter a Comment ...' onChange={this.editHandleChangeForModalCons}required></textarea><br />
                  <div className="editRatingStar">
                  <p>Overall Rating</p>
                  <span className="rating"><span className="five5 EditrateEmployee star"></span><span className="four4 EditrateEmployee star "></span><span className="three3 EditrateEmployee star"></span><span className="two2 EditrateEmployee star filled"></span><span className=" first1 EditrateEmployee star filled"></span></span>
                </div>
                <input type='submit' className='add-small' value='Submit Review' />
              </form>
            </div>

          </div>

        </Modal>
        {
        this.props.renderEmployeeData.map((filed, index) =>
        <div key={index} className={`comments ${index}`}>
          <div>
            <span><strong>Overall Rating: </strong></span>
            <span>{
              this.produceStarsForEmployee(filed.countOfReviews).map((ele, indx) =>
                <img key={indx} className="roundstar" src='./roundstar1.png' />
              )
            }</span>
          </div>
         <div className={filed.id + ' review-item'}>
           <strong>{`Title:`}</strong>
           {filed.employeeComments[0].reviewTitle}
         </div>
          <div className='review-item'> 
            <strong>{`Pros:`}</strong>
            <div className='review-sub'>{filed.employeeComments[2].prosReview}</div>
          </div>
          <div className='review-item'><strong>{`Cons:`}</strong>
            <div className='review-sub'>{filed.employeeComments[1].consReview}</div>
          </div>
          <button className="editEmployeeReview" >Edit</button>
          <input type="button" className={`helpfulPoints ${index}`} value={`${filed.helpfulButtonScore}`}/>

        </div>
        
        )
      }
      </div>
    )
  }
}