import React from 'react';
import $ from 'jQuery';

export default class UploadComponent extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      filesData : null
    }

    this.getUploadedData = this.getUploadedData.bind(this); 
    this.handleFileChange =this.handleFileChange.bind(this);
  }
  handleFileChange(event) {
    this.setState({
      filesData: event.target.value
    })
  }
  getUploadedData(event) {
    var context = this;
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/upload',
      data: JSON.stringify(context.state.filesData),
      success: function(data) {
        console.log('This is the uploaded data', data);
      }
    })
  }

  render() {
    return (
      <div> 
        <form action="/api/upload" method="post" encType="multipart/form-data">
          Select an image to upload:
          <input type="file" name="fileUpload" className="form-control" onChange={this.handleFileChange}/>
          <button type="submit"> upload files</button>
          
           <a href="https://s3.amazonaws.com/uploadImages92/002_overview.pdf">test.pdf</a> 
        </form>
      </div>
    )
  }
}