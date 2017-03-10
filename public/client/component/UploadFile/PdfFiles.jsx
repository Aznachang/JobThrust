import React from 'react';
import $ from 'jQuery';
import Modal from 'react-modal';

export default class PdfFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    }
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    console.log('I came here and here are the data', this.props)
    var context = this;
    $(function() {
      $(document).on('click', '.singleFile', function() {
        context.openModal();
        console.log('This is the url that was clicked', $(this)[0].classList)
        var url = $(this)[0].classList[1];
        console.log('This is the url', url)
        var frame = "<iframe key={indx} src="+ url+' '+"class=singleFile title=your_title frameBorder=0 scrolling=auto target=Message></iframe>";
        $('.innercontainer').append(frame);
      })
    })
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
  render() {
    // should handle an edge case where ending of a file url is (2) ... space issues
    console.log('I came to the render secition', this.props)
    return(
      <div className="uploadFiles">
        {
          this.props.displayFilesPdf.map((file, indx)  => 
          <a key={indx} href="#" className={`singleFile ${file.imgeUrl}`} >{file.name}</a>
        
         )
        }
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
        <div className="innercontainer">
          <br/><br/>
          <button type="button" onClick={this.closeModal}>Done Reviewing</button> 
          <br/><br/>

        </div>

        </Modal>
      </div>
    )
  }
}