import React from 'react';
import Application from './Application.jsx';

var applications = [
  {job: 'Software Engineer - Facebook', stage: 1},
  {job: 'Software Engineer - Google', stage: 1},
  {job: 'Software Engineer - Microsoft', stage: 3},
  {job: 'Full-Stack Engineer - AdRoll', stage: 4},
  {job: 'Web Developer - IFTTT', stage: 2},
  {job: 'Software Engineer - Instagram', stage: 5},
  {job: 'Web Engineer - BasedAvocado', stage: 3}
];

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