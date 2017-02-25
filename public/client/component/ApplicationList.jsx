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
                <th name="company" onClick={this.props.sort.bind(null, 'company')}>Company</th>
                <th value="title" onClick={this.props.sort.bind(null, 'title')}>Role</th>
                <th value="stageId" onClick={this.props.sort.bind(null, 'stageId')}>Current Stage</th>
                <th value="createdAt" onClick={this.props.sort.bind(null, 'createdAt')}>Created</th>
              </tr>
            </thead>
            <tbody>
            { this.props.jobInfo.map((app, i) =>
              <Application key={i} filter={this.props.filter} filtered={this.props.filtered} sortList={this.props.sortList} stages={this.props.stages} company={app.company} created={app.createdAt} job={app.title} jobId={app.jobId} stage={this.props.stages[app.stageId]} id={app.id} changeStage={this.props.changeStage} />
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
                <th name="company" onClick={this.props.sort.bind(null, 'company')}>Company</th>
                <th value="title" onClick={this.props.sort.bind(null, 'title')}>Role</th>
                <th value="stageId" onClick={this.props.sort.bind(null, 'stageId')}>Current Stage</th>
                <th value="createdAt" onClick={this.props.sort.bind(null, 'createdAt')}>Created</th>
              </tr>
            </thead>
            <tbody>
            { this.props.filteredJobs.map((app, i) =>
              <Application key={i} filter={this.props.filter} filtered={this.props.filtered} sortList={this.props.sortList} stages={this.props.stages} company={app.company} created={app.createdAt} job={app.title} jobId={app.jobId} stage={this.props.stages[app.stageId]} id={app.id} changeStage={this.props.changeStage} />
            ) }
            </tbody>
          </table>
        </div>
      )
    }
  }
};