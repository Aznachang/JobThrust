import React from 'react';
import $ from 'jQuery';

export default class CompanyListComponent extends React.Component {
	constructor(props) {
    console.log('props',props)
    super(props);
  }

  textBox() {
    $(function() {
      $('.companyInfo').append('<textarea value="save" class="textArea"></textarea>');
      $('.companyInfo').append('<button class="saveme">save</button>');

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
  render() {
    if (this.props.companyInfo[0]) {
      this.textBox();

    return (
      <div className='companyInfo'> 
        {
          this.props.companyInfo.map((job, i) =>
            <div key={i} >
              <div>
                <img src={job.squareLogo} style={{'height':'100px', 'width':'100px'}}/>
              </div>
              <h3>{job.name}</h3>
              <p>{this.props.companyView}</p>
              <br></br>
              <br></br>
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