import React from 'react';

export default class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span className="job-title">{this.props.job}</span>
        <span className="company">{this.props.company}</span>
        <span className="stage">{this.props.stage}</span>
      </div>
    )
  }
}