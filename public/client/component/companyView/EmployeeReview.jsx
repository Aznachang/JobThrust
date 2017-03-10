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
    // this.editEmployeeReviewForm = this.editEmployeeReviewForm.bind(this);
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
        var id = $(this).parent()[0].children[1].classList[0];
        console.log('This is parent', $(this).parent()[0].children);
        $.ajax({
            method: 'GET',
            url: '/api/buttonsInfo?name='+ id,
            contentType:'application/json',
            success: function(data) {
              console.log('hers is a single data ', data);
              var existUser = false;
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
    $('.reviewTitle').val(array[1])
    $('.pros').val(array[2]); 
    $('.cons').val(array[3]); 
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

//   editEmployeeReviewForm(event) {
//     event.preventDefault();
//     $(document).on('submit', '#editInterivew', function(event) { 
//     console.log('my array of inputs', this.arrayOfinputs)
//     //<div className={filed.id +' '+'review-item'}><strong>Title:</strong>{filed.employeeComments[0].reviewTitle}</div>

//     if (!this.state.editReviewTitle) {
//       var $editReviewTitle = '<div class='+ this.idForUpdateDB+' '+'review-item' +'>Review Title:' + this.arrayOfinputs[1] + '</div>';
//       var reviewTitle = {reviewTitle:this.arrayOfinputs[1]};

//       this.setState({
//         editReviewTitle: this.arrayOfinputs[1]
//       })
//     } else {
//       var $editReviewTitle = '<div class='+ this.idForUpdateDB+' '+'review-item' +'>Review Title:' + this.state.editReviewTitle + '</div>';
//       var reviewTitle = {reviewTitle: this.state.editReviewTitle}
//     }
// // <div className='review-item'><strong>Cons:</strong><div class="review-sub">{filed.employeeComments[1].consReview}</div></div>
//     if (!this.state.eidtProsReview) {
//       var $eidtProsReview = '<div class="review-item">Cons<div class="review-sub">:' + this.arrayOfinputs[2] + '</div></div>';
//       var consReview = {consReview: this.arrayOfinputs[2]};

//       this.setState({
//         eidtProsReview: this.arrayOfinputs[2]
//       })
//     } else {
//       var $eidtProsReview = '<div class="review-item">Cons:<div class="review-sub">' + this.state.eidtProsReview + '</div></div>';
//       var consReview = {consReview: this.state.eidtProsReview};
//     }
// // <div className='review-item'> <strong>Pros:</strong><div className='review-sub'>{filed.employeeComments[2].prosReview}</div></div>

//     if(!this.state.editConsReview) {
//       var $editConsReview = '<div class="review-item">Pros:<div class="review-sub">' + this.arrayOfinputs[3] + '</div></div>';
//       var prosReview = {prosReview: this.arrayOfinputs[3]};
//       this.setState({
//         editConsReview: this.arrayOfinputs[3]
//       })
//     } else {
//       var $editConsReview = '<div class="review-item">Pros:<div classame="review-sub">' + this.state.editConsReview + '</div>';
//       var prosReview = {prosReview: this.state.editConsReview}
//     }



//     if (Number(this.eidtStarCount) === 0) {
//         var editCountStar = this.arrayOfinputs[0].children.length-1;
//         if (editCountStar === 1) {
//           var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" />';
//         } else if (editCountStar === 2) {
//           var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" />';
//         } else if (editCountStar === 3) {
//           var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" />';
//         } else if (editCountStar === 4) {
//           var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" />';
//         } else if (editCountStar === 5) {
//           var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" />';
//         }
//     } else {
//       var editCountStar = Number(this.eidtStarCount);
//         if (editCountStar === 1) {
//           var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" />';
//         } else if (editCountStar === 2) {
//           var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" />';
//         } else if (editCountStar === 3) {
//           var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" />';
//         } else if (editCountStar === 4) {
//           var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" />';
//         } else if (editCountStar === 5) {
//           var $editStarElement = '<img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" /><img key={indx} class="roundstar" src="roundstar1.png" />';
//         }
//     }

//     var $editStarElementList = '<div>'+ $editStarElement + '</div>';
//     // console.log('This should be the new stars update',$editStarElementList )
//     var $button = '<button class="editEmployeeReview" >Edit</button>';
//     var logoImage = '<img src='+ this.props.imgUrl +' '+'class="companyImg"/>';
//     var helpfulButton = '<input type="button" value='+ this.arrayOfinputs[4].value.replace(/[' ']/g, '')+' '+'class="helpfulPoints" />';
//     console.log('----This the the main $$ele---', $(this.$ele).parent())
//     $(this.$ele).parent().html($editStarElementList+$editReviewTitle+$eidtProsReview+$editConsReview+$button+helpfulButton);
//     this.closeModal();
//     var updatedEmployeeData = [reviewTitle, consReview, prosReview]
//     console.log('This is the updated version', updatedEmployeeData)
//     this.sendUpdatedEmployeeData([updatedEmployeeData, this.idForUpdateDB, editCountStar]);
//    })
//   }

  sendUpdatedEmployeeData(data) {
    console.log('This is the data-----', data)
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
    var $ele;
    $(function() {
      $(document).on('click', '.editEmployeeReview', function() {
        $ele = this; 
        context.idForUpdateDB = $(this).parent()[0].children[1].classList[0];
        console.log('those are the children', $(this).parent()[0].children)
        console.log('this is the error', $(this).parent()[0].children[3])
        context.arrayOfinputs = [ 
          $(this).parent()[0].children[0], 
          $(this).parent()[0].children[1].innerText.split(':')[1],
          $(this).parent()[0].children[2].innerText.split(':')[1],
          $(this).parent()[0].children[3].innerText.split(':')[1],
          $(this).parent()[0].children[5]
        ]
        context.openModal(context.arrayOfinputs);
      })

    $(document).on('submit', '#editEmployee', function(event) { 
    console.log('my array of inputs', this.arrayOfinputs)
    //<div className={filed.id +' '+'review-item'}><strong>Title:</strong>{filed.employeeComments[0].reviewTitle}</div>
    event.preventDefault();
    if (!context.state.editReviewTitle) {
      var $editReviewTitle = "<div class="+ context.idForUpdateDB+' '+'review-item' +">Review Title:" + context.arrayOfinputs[1] + "</div>";
      var reviewTitle = {reviewTitle:context.arrayOfinputs[1]};

      context.setState({
        editReviewTitle: context.arrayOfinputs[1]
      })
    } else {
      var $editReviewTitle = "<div class="+ context.idForUpdateDB+' '+'review-item' +">Review Title:" + context.state.editReviewTitle + "</div>";
      var reviewTitle = {reviewTitle: context.state.editReviewTitle}
    }
// <div className='review-item'><strong>Cons:</strong><div class="review-sub">{filed.employeeComments[1].consReview}</div></div>
    if (!context.state.eidtProsReview) {
      var $eidtProsReview = "<div class='review-item'>Cons<div class='review-sub'>:" + context.arrayOfinputs[2] + "</div></div>";
      var consReview = {consReview: context.arrayOfinputs[2]};

      context.setState({
        eidtProsReview: context.arrayOfinputs[2]
      })
    } else {
      var $eidtProsReview = "<div class='review-item'>Cons:<div class='review-sub'>" + context.state.eidtProsReview + "</div></div>";
      var consReview = {consReview: context.state.eidtProsReview};
    }
// <div className='review-item'> <strong>Pros:</strong><div className='review-sub'>{filed.employeeComments[2].prosReview}</div></div>

    if(!context.state.editConsReview) {
      var $editConsReview = "<div class='review-item'>Pros:<div class='review-sub'>" + context.arrayOfinputs[3] + "</div></div>";
      var prosReview = {prosReview: context.arrayOfinputs[3]};
      context.setState({
        editConsReview: context.arrayOfinputs[3]
      })
    } else {
      var $editConsReview = "<div class='review-item'>Pros:<div classame='review-sub'>" + context.state.editConsReview + "</div></div>";
      var prosReview = {prosReview: context.state.editConsReview}
    }



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

    var $editStarElementList = '<div><strong>Overall Rating: </strong>'+ $editStarElement + '</div>';
    // console.log('This should be the new stars update',$editStarElementList )
    var $button = '<button class="editEmployeeReview" >Edit</button>';
    // var logoImage = '<img src='+ context.props.imgUrl +' '+'class="companyImg"/>';
    var helpfulButton = '<input type="button" value='+ context.arrayOfinputs[4].value.replace(/[' ']/g, '')+' '+'class="helpfulPoints" />';
    console.log('----This the the main $$ele---',$editStarElementList )
    console.log('----This the the main $$ele---',$editReviewTitle )
    console.log('----This the the main $$ele---',$eidtProsReview)
        console.log('----This the the main $$ele---',$editConsReview)

    console.log('THis is also the element', $($ele).parent())
    /*
    so I just figure out what was the problem at some point after editing more than once. for some reason the $button and helpfulbutton gets wrapped up 
    inside the pros div. they should be separate
    */
    $($ele).parent().html($editStarElementList+$editReviewTitle+$eidtProsReview+$editConsReview+$button+helpfulButton);
    context.closeModal();
    var updatedEmployeeData = [reviewTitle, consReview, prosReview]
    console.log('This is the updated version', updatedEmployeeData)
    context.sendUpdatedEmployeeData([updatedEmployeeData, context.idForUpdateDB, editCountStar]);
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
              <form id="add-app-form" id="editEmployee">
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
            <strong>Overall Rating: </strong>
            {
              this.produceStarsForEmployee(filed.countOfReviews).map((ele, indx) =>
                <img key={indx} className="roundstar" src='./roundstar1.png' />
              )
            }
          </div>
         <div className={filed.id +' '+'review-item'}><strong>Title:</strong>{filed.employeeComments[0].reviewTitle}</div>
          <div className='review-item'> <strong>Pros:</strong><div className='review-sub'>{filed.employeeComments[2].prosReview}</div></div>
          <div className='review-item'><strong>Cons:</strong><div className='review-sub'>{filed.employeeComments[1].consReview}</div></div>
          {filed.userId === this.props.userId ? <button className="editEmployeeReview">Edit</button> : null}
          <input type="button" className={`helpfulPoints ${index}`} value={`${filed.helpfulButtonScore}`}/>
        </div>
        
        )
      }
      </div>
    )
  }
}