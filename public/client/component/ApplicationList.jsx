import React from 'react';
import Application from './Application.jsx';

var stages = {
  1: 'Interested',
  2: 'Phone Screen',
  3: 'On-Site',
  4: 'Decision',
  5: 'Offered'
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
          { applications.map((app, i) =>
            <Application key={i} job={app.job} stage={stages[app.stage]} />
          ) }
          </tbody>
        </table>
      </div>
    )
  }
};