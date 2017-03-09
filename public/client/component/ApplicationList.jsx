import React from 'react';
import Application from './Application.jsx';

export default class ApplicationList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var noJobApps;

    // Conditional Rendering - Show This Message when no Jobs Saved!
    if (this.props.jobInfo.length === 0) {
      noJobApps =
      <tr className='noJobs'>
        <td colSpan='4'>No Record of Active Jobs Saved</td>
      </tr>
    } else {
      noJobApps = <tr></tr>
    }

    if (this.props.filtered === null) {
      return (
        <div id="AppList">
          <table>
            <thead>
              <tr>
                <th onClick={this.props.sort.bind(null, 'title')}>Role</th>
                <th onClick={this.props.sort.bind(null, 'company')}>Company</th>
                <th className='th-stage' onClick={this.props.sort.bind(null, 'stageId')}>Current Stage</th>
                <th className='th-created' onClick={this.props.sort.bind(null, 'createdAt')}>Created</th>
              </tr>
            </thead>
            <tbody>
            { this.props.jobInfo.map((app, i) =>
              <Application key={i} filter={this.props.filter} filtered={this.props.filtered} sortList={this.props.sortList} stages={this.props.stages} company={app.company} created={app.createdAt} job={app.title} jobId={app.jobId} stage={this.props.stages[app.stageId]} id={app.id} changeStage={this.props.changeStage} getJobs={this.props.getJobs} />
            ) }
            {noJobApps}
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
                <th onClick={this.props.sort.bind(null, 'title')}>Role</th>
                <th onClick={this.props.sort.bind(null, 'company')}>Company</th>
                <th className='th-stage' onClick={this.props.sort.bind(null, 'stageId')}>Current Stage</th>
                <th className='th-created' onClick={this.props.sort.bind(null, 'createdAt')}>Created</th>
              </tr>
            </thead>
            <tbody>
            { this.props.filteredJobs.map((app, i) =>
              <Application key={i} filter={this.props.filter} filtered={this.props.filtered} sortList={this.props.sortList} stages={this.props.stages} company={app.company} created={app.createdAt} job={app.title} company={app.company} jobId={app.jobId} stage={this.props.stages[app.stageId]} id={app.id} changeStage={this.props.changeStage} getJobs={this.props.getJobs} />
            ) }
            {noJobApps}
            </tbody>
          </table>
        </div>
      )
    }
  }
};