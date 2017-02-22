import React from 'react';
import Application from './Application.jsx';

var stages = {
  0: 'Interested',
  1: 'Phone Screen',
  2: 'On-Site',
  3: 'Decision',
  4: 'Offered'
};

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
            <Application key={i} job={app.title} stage={stages[app.stageId]} />
          ) }
          </tbody>
        </table>
      </div>
    )
  }
};