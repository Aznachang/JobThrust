import React from 'react';

var stages = {
  1: 'Interested',
  2: 'Phone Screen',
  3: 'On-Site',
  4: 'Decision',
  5: 'Offered'
};

var applications = [
  {job: 'Software Engineer', company: 'Facebook', stage: 1},
  {job: 'Software Engineer', company: 'Google', stage: 1},
  {job: 'Software Engineer', company: 'Microsoft', stage: 3},
  {job: 'Full-Stack Engineer', company: 'AdRoll', stage: 4},
  {job: 'Web Developer', company: 'IFTTT', stage: 2},
  {job: 'Software Engineer', company: 'Instagram', stage: 5},
  {job: 'Web Engineer', company: 'BasedAvocado', stage: 3}
];

export default class ApplicationList extends React.Component {

  constructor() {

  }

  render() {
    return (
      <div id="AppList">
        { applications.map((app, i) =>
            <Application key={i} job={app.job} company={app.company} stage={stages[app.stage]} />
        ) }
      </div>
    )
  }
};