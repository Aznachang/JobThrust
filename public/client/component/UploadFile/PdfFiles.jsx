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
    var context = this;
    $(function() {
      $(document).on('click', '.singleFile', function() {
        context.openModal();
        var url = $(this)[0].classList[1];
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
    return(
      <div className="uploadFiles">
        <table>
          <thead>
            <th>PDFs / Documents</th>
          </thead>
          <tbody>
            {this.props.displayFilesPdf.map((file, indx)  => 
              <tr>
                <td><a key={indx} href="#" className={`singleFile ${file.imgeUrl}`} >{file.name}</a></td>
              </tr>
            )}
          </tbody>
        </table>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
        <div className="innercontainer">

        </div>

        </Modal>
      </div>
    )
  }
}