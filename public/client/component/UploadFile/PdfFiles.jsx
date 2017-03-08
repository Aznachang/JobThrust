import React from 'react';
import $ from 'jQuery';

export default class PdfFiles extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="uploadFiles">
        {
          this.props.displayFiles.map((file, indx)  =>
          <iframe key={indx} src={`${file.imgeUrl}`} title="your_title" className="singleFile" frameBorder="0" scrolling="auto" target="Message">
          </iframe>
         )
        }
      </div>
    )
  }
}