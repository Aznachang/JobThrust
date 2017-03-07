import React from 'react';
import ArchiveJob from './ArchiveJob.jsx';

export default class ArchiveJobsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.filtered === null) {
      console.log('jobInfo: ', this.props.jobInfo);
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
            { this.props.archivedInfo.map((app, i) =>
              <ArchiveJob key={i} filter={this.props.filter} filtered={this.props.filtered} sortList={this.props.sortList} stages={this.props.stages} company={app.company} created={app.createdAt} job={app.title} jobId={app.jobId} stage={this.props.stages[app.stageId]} id={app.id} changeStage={this.props.changeStage} />
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
                <th onClick={this.props.sort.bind(null, 'title')}>Role</th>
                <th onClick={this.props.sort.bind(null, 'company')}>Company</th>
                <th className='th-stage' onClick={this.props.sort.bind(null, 'stageId')}>Current Stage</th>
                <th className='th-created' onClick={this.props.sort.bind(null, 'createdAt')}>Created</th>
                <th className='th-archive'>Archive</th>
              </tr>
            </thead>
            <tbody>
            { this.props.filteredArchiveJobs.map((app, i) =>
              <ArchiveJob key={i} filter={this.props.filter} filtered={this.props.filtered} sortList={this.props.sortList} stages={this.props.stages} company={app.company} created={app.createdAt} job={app.title} company={app.company} jobId={app.jobId} stage={this.props.stages[app.stageId]} id={app.id} changeStage={this.props.changeStage} />
            ) }
            </tbody>
          </table>
        </div>
      )
    }
  }
};