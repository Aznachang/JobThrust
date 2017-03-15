import React from 'react';
import $ from 'jQuery';
import getFormData from 'get-form-data';
// import Dropzone from './index.jsx';
import FilesLists from './FilesLists.jsx';
import PdfFiles from './PdfFiles.jsx';

export default class UploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filesDataPdf : null,
      filesDataImg: null
    }
    var context = this
    this.getUploadedData = this.getUploadedData.bind(this); 

    this.getUploadedData();
  }

  getUploadedData() {
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/api/upload',
      success: function(data) {
        var pdfFiles = [];
        var imagesFiles = [];

        if (data !== null) {
          data.forEach(function(file) {
            var lastChars = file.name.split('.')[1]
            if (lastChars === 'pdf') {
              pdfFiles.push(file);
            } else {
              imagesFiles.push(file);
            }
          })
          context.setState({
            filesDataPdf: pdfFiles,
            filesDataImg: imagesFiles
          }, function() {
            if (window.location.pathname === '/upload' || window.location.pathname === '/upload#') {
              setTimeout(context.getUploadedData, 3000);
            }
          });
        }
      }
    })
  }

componentDidMount() {
}

  render() {
  // var context = this
  //   $(function() {
  //     $('.isUpload').click(function() {
  //       context.getUploadedData();
  //     })
  //   })
    return (
      <div className='upload-container'> 
        <div className='upload-header'><h3>Uploads</h3></div>

        <div className='create-upload-container'>
          <form method="post" encType="multipart/form-data" action="/api/upload" target="upload_target">
            <div>Select an image or PDF to upload:</div>
            <div className='upload-choose-file'>
              <input type="file" name="fileUpload" className="form-control"/>
            </div>
            <div>
              <input type="submit" name="submitBtn" value="Upload" className="isUpload"/>
            </div>
          </form>
        </div>
        <iframe id="upload_target" name="upload_target" src="#"></iframe>
        <div className='upload-tables'>
          <div>
            
            {
              (this.state.filesDataPdf !== null) ? <PdfFiles displayFilesPdf={this.state.filesDataPdf}/> : null
            }
          </div>
          <div>

            {
              (this.state.filesDataImg !== null) ? <FilesLists displayFilesImg={this.state.filesDataImg}/> : null
            }
          </div>
        </div>
      </div>
    )
  }
}