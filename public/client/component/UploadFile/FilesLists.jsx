import React from 'react';
import $ from 'jQuery';
import Modal from 'react-modal';


export default class FilesLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    }
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    console.log('This is the images files', this.props)
    var context = this;
    $(function() {
      $(document).on('click', '.singleFileForImage', function() {
        context.openModal();
        console.log('This is the url that was clicked', $(this)[0].classList)
        var url = $(this)[0].classList[1];
        console.log('This is the url', url)
        var image = "<img src="+ url+' '+"class=singleFileForImage />";
        $('.innercontainer').append(image);
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

    return(
      <div className="uploadFiles">
        <table>
          <thead>
            <th>Images</th>
          </thead>
          <tbody>
            {this.props.displayFilesImg.map((file, indx)  =>
              <tr>
                <td><a key={indx} href="#" className={`singleFileForImage ${file.imgeUrl}`} >{file.name}</a></td>
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