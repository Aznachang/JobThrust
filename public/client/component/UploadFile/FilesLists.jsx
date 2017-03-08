import React from 'react';
import $ from 'jQuery';

export default class FilesLists extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="uploadFiles">
        {
          this.props.displayFiles.map((file, indx)  =>
           <img key={indx} src={`${file.imgeUrl}`} className="singleFile"/> 
          )
        }
      </div>
    )
  }
}