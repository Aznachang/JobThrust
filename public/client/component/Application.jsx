import React from 'react';

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.nextStage = this.nextStage.bind(this);
  }

  // TO BE APPLIED SOMEHOW - FULLY FUNCTIONING, JUST NOT ATTACHED TO ANYTHING
  nextStage() {
    console.log('Attempting to change stages using ID:', this.props.id);
    this.props.changeStage(this.props.id);
  }

  render() {
    return (
      <tr className="application">
        <td className="job-title">{this.props.job}</td>
        <td className="stage">{this.props.stage}</td>
      </tr>
    )
  }
}