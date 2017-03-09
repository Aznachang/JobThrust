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

  // this.getUploadedData();
  }

  getUploadedData() {
    var context = this;
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/api/upload',
      success: function(data) {
        console.log('This is the uploaded data', data);
        var pdfFiles = [];
        var imagesFiles = [];

        if (data !== null) {
          data.forEach(function(file) {
            var lastChars = file.name.split('.')[1]
            console.log('Ending url ', lastChars);
            if (lastChars === 'pdf') {
              pdfFiles.push(file);
            } else {
              imagesFiles.push(file);
            }
          })
          context.setState({
            filesDataPdf: pdfFiles,
            filesDataImg: imagesFiles
          })
        }
      }
    })
  }
// componentWillUpdate() {
//   this.getUploadedData();
// }
componentDidMount() {
  this.getUploadedData();
}
  render() {
  // var context = this
  //   $(function() {
  //     $('.isUpload').click(function() {
  //       context.getUploadedData();
  //     })
  //   })
    return (
      <div> 
        <form method="post" encType="multipart/form-data" action="/api/upload" target="upload_target">
          Select an image to upload:
          <input type="file" name="fileUpload" className="form-control"/>
          <input type="submit" name="submitBtn" value="Upload" className="isUpload"/>
        </form>
        <iframe id="upload_target" name="upload_target" src="#"></iframe>
        <div>

          {
            (this.state.filesDataImg !== null) ? <FilesLists displayFiles={this.state.filesDataImg}/> : null
          }
        </div>
        <div>
          
          {
            (this.state.filesDataPdf !== null) ? <PdfFiles displayFiles={this.state.filesDataPdf}/> : null
          }
        </div>
      </div>
    )
  }
}