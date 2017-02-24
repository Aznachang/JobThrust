import React from 'react';
import Application from './Application.jsx';
export default class ApplicationList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.filtered === null) {
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
              <Application key={i} sortList={this.props.sortList} stages={this.props.stages} job={app.title} jobId={app.jobId} stage={this.props.stages[app.stageId]} id={app.id} changeStage={this.props.changeStage} />
            ) }
            </tbody>
          </table>
        </div>
      )
    } else {
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
            { this.props.filteredJobs.map((app, i) =>
              <Application key={i} sortList={this.props.sortList} stages={this.props.stages} job={app.title} jobId={app.jobId} stage={this.props.stages[app.stageId]} id={app.id} changeStage={this.props.changeStage} />
            ) }
            </tbody>
          </table>
        </div>
      )
    }
  }
};