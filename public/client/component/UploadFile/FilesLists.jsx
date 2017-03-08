import React from 'react';
import $ from 'jQuery';

export default class FilesLists extends React.Component {
  constructor(props) {
    super(props);
    this.checkPdf = this.checkPdf.bind(this);
  }

  checkPdf(url) {
    var lastChars = url.slice(url.length-3);
    if (lastChars === 'pdf') {
      return true;
    } 
    return false;
  }
  render() {

    return(
      <div className="uploadFiles">
        {
          this.props.displayFiles.map((file, indx)  => 

            { (this.checkPdf(file.imgeUrl)) ? <a href={`${file.imgeUrl}`}> : <img key={indx} src={`${file.imgeUrl}`}className='singleFile'/>}
          )
        }
      </div>
    )
  }
}