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
           <a key={indx} href={`${file.imgeUrl}`} className="singleFile"> Download PDF File</a>
          )
        }
      </div>
    )
  }
}