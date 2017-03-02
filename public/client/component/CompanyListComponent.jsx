import React from 'react';
import $ from 'jQuery';

export default class CompanyListComponent extends React.Component {
	constructor(props) {
    console.log('props',props)
    super(props);
    this.state = {
      counter: true
    }
    this.appendDiv = this.appendDiv.bind(this);
    this.appendingEmployee = this.appendingEmployee.bind(this);
  }

  textBox() {
    $(function() {
      $('#comments').append('<textarea value="save" class="textArea"></textarea>');
      $('#comments').append('<button class="saveme">save</button>');

      $(document).on('click', '.saveme', function() { 

        var text = $('.textArea').val();
        $('.newDiv').append('<p><input type="button" class="edit" value="edit">'+text+'</p>');

      })

      $(document).on('click', '.edit', function() { 

        var result = $(this).parent().text();
        var $textarea = $('<textarea class="textArea2"></textarea><button class="save">save</button>');
        $textarea.val(result) 
        $(this).parent().html($textarea);


      })

      $(document).on('click', '.save', function() { 

        var textInner = $('.textArea2').val();
        $(this).parent().html('<p><input type="button" class="edit" value="edit">'+textInner+'</p>');

      })
    })
  }

  appendDiv() {
    $('.newDiv').css('display','block');
    if (this.state['counter']) {
      console.log('I came here')
      $('#stars').append("<span>&#9734</span><span>&#9734</span><span>&#9734</span><span>&#9734</span><span>&#9734</span>");
    }
    this.setState({
      counter: false
    })
    $('.employeeReview').css('display', 'none');
  }
  appendingEmployee() {
    $('.newDiv').css('display','none');
    if (this.state['counter']) {
      console.log('I came here')
      $('#stars').append("<span>&#9734</span><span>&#9734</span><span>&#9734</span><span>&#9734</span><span>&#9734</span>");
    }
    this.setState({
      counter: false
    })
    $('.employeeReview').css('display', 'block');
  }
  render() {
    if (this.props.companyInfo[0]) {
      // this.textBox();

    return (
      <div className='item animated fadeInDownBig companyInfo'>
        {
          this.props.companyInfo.map((job, i) =>
            <div key={i} >
              <img src='http://www.talentculture.com/wp-content/uploads/2015/05/bigstock-New-Job-creative-sign-with-clo-75551917-740x431.jpg' style={{'height':'150px', 'width':'100%'}}/>
              <div className="innerText">
                <h3>{job.name}</h3>
                <p>{this.props.companyView}</p>
                <br></br>
                <br></br>
                <div>
                  <a href="#" onClick={this.appendingEmployee}><img className="employerReview" src="https://cdn3.iconfinder.com/data/icons/3d-printing-icon-set/512/Engineer.png"/></a><br/>
                  <p className="ptage">Interview Reviews</p> 
                </div>
                <div>
                  <a href="#" onClick={this.appendDiv}><img className="interviewReview" src="http://www.clipartkid.com/images/366/figure-sitting-in-a-blue-question-mark-wLA4Pb-clipart.png"/></a>
                  <p className="ptage1">Employee Reviews</p>
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
  } 
}