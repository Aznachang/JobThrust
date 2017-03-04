import React from 'react';
import $ from 'jQuery';

export default class UploadComponent extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      filesData : null
    }

    this.uploadData = this.uploadData.bind(this); 
    this.handleFileChange =this.handleFileChange.bind(this);
  }
  handleFileChange(event) {
    this.setState({
      filesData: event.target.value
    })
  }
  uploadData(event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/upload',
      data: JSON.stringfiy(filesData),
      success: function(data) {
        console.log('This is the uploaded data', data);
      }
    })
  }

  render() {
    return (
      <form action="/api/upload" method="POST" encType="multipart/form-data">
        Select an image to upload:
        <input type="file" name="image"/> 
        <input type="submit" value="Upload Image"/>
      </form>
    )
  }
}