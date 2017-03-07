import React from 'react';
import $ from 'jQuery';

export default class UploadComponent extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      filesData : null
    }

    this.getUploadedData = this.getUploadedData.bind(this); 
    this.handleFileChange = this.handleFileChange.bind(this);
  }
  handleFileChange(event) {
    this.setState({
      filesData: event.target.value
    })
  }
  getUploadedData() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/api/upload',
      success: function(data) {
        console.log('This is the uploaded data', data);
      }
    })
  }

  render() {
    this.getUploadedData();
    console.log(__dirname)
    return (
      <div>
        
        <form action="/api/upload" method="post" encType="multipart/form-data">
          Select an image to upload:
          <input type="file" name="fileUpload" className="form-control"/>
          <button type="submit"> upload files</button>
        </form>
        <img src="https://s3.amazonaws.com/ahmedmaxzz90/IMG_3749.JPG"/> 
      </div>
    )
  }
}