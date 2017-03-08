import React from 'react';
import $ from 'jQuery';
import getFormData from 'get-form-data';
// import Dropzone from './index.jsx';
import FilesLists from './FilesLists.jsx';
export default class UploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filesData : null
    }

    this.getUploadedData = this.getUploadedData.bind(this); 
  }

  getUploadedData() {
    var context = this;
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/api/upload',
      success: function(data) {
        console.log('This is the uploaded data', data);

        context.setState({
          filesData: data
        })
      }
    })
  }

  render() {
    return (
      <div> 
        <form method="post" encType="multipart/form-data" action="/api/upload" target="upload_target">
          Select an image to upload:
          <input type="file" name="fileUpload" className="form-control"/>
          <input type="submit" name="submitBtn" value="Upload" />
           {
            this.getUploadedData()
           }
        </form>
        <iframe id="upload_target" name="upload_target" src="#"></iframe>
        {

          (this.state.filesData !== null) ? <FilesLists displayFiles={this.state.filesData}/> : null
        }
      </div>
    )
  }

  // uploadFile(files) {
  //   console.log('Uploaded files are finally here', files[0])
  // }
  // render() {
  //   return (
  //     <div> 
  //      Upload Files
  //       <Dropzone onDrop={this.getUploadedData}/>
  //     </div>
  //   )
  // }
}