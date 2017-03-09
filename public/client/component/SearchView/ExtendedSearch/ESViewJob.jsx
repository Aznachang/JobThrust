import React from 'react';

export default class ESViewJob extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div >
        <div className='ext-search-header'><h3>Viewing: {this.props.job.title} ({this.props.job.company})</h3></div>
        <div className='btn-container'>
          <div className='app-btn back-btn' onClick={this.props.backToResults}>◀ Back</div>
        </div>
        <div className='ext-view-container'>
          <iframe src={this.props.job.link}></iframe>
        </div>
      </div>
    )
  }
}