import React from 'react';
import Application from './Application.jsx';

var stages = {
  0: 'Interested',
  1: 'Phone Screen',
  2: 'On-Site',
  3: 'Decision',
  4: 'Offered'
};

export default class ApplicationList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="AppList">
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Current Stage</th>
            </tr>
          </thead>
          <tbody>
          { this.props.jobInfo.map((app, i) =>
            <Application key={i} job={app.title} stage={this.props.stages[app.stageId]} id={app.id} changeStage={this.props.changeStage} />
          ) }
          </tbody>
        </table>
      </div>
    )
  }
};