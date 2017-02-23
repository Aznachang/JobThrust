import React from 'react';

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.nextStage = this.nextStage.bind(this);
  }

  nextStage() {
    console.log('Attempting to change stages using ID:', this.props.id);
    this.props.changeStage(this.props.id);
  }

  render() {
    return (
      <tr className="application">
        <td className="job-title" onClick={this.nextStage}>{this.props.job}</td>
        <td className="stage" onClick={this.nextStage}>{this.props.stage}</td>
      </tr>
    )
  }
}