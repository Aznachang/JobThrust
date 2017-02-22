import React from 'react';

export default class Application extends React.Component {
  constructor(props) {
    super(props);
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