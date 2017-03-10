import React from 'react';
import ArchiveJob from './ArchiveJob.jsx';

export default class ArchiveJobsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var noArchivedOffers;
    var noArchived = this.props.archivedInfo.length;

    // Show This Messsage - No Archived Job Offers
    if (noArchived === 0) {
      noArchivedOffers = <tr className='noJobs'>
        <td colSpan='6'>No Archived Opportunities</td>
      </tr>
    } else {
      noArchivedOffers = <tr></tr>
    }

    if (this.props.filtered === null) {
      return (
        <div id="AppList" className='archived-list'>
          <table>
            <thead>
              <tr>
                <th className ='.archive-role-company' onClick={this.props.sort.bind(null, 'title')}>Role</th>
                <th className ='.archive-role-company' onClick={this.props.sort.bind(null, 'company')}>Company</th>
                <th className='archive-stage-reason' onClick={this.props.sort.bind(null, 'stageId')}>Stage</th>
                <th className='archive-stage-reason' onClick={this.props.sort.bind(null, 'reason')}>Reason</th>
                <th className='archive-created' onClick={this.props.sort.bind(null, 'createdAt')}>Created</th>
              </tr>
            </thead>
            <tbody>
            { this.props.archivedInfo.map((app, i) =>
              <ArchiveJob key={i} filter={this.props.filter} filtered={this.props.filtered} sortList={this.props.sortList} stages={this.props.stages} company={app.company} created={app.createdAt} job={app.title} jobId={app.jobId} stage={this.props.stages[app.stageId]} id={app.id} changeStage={this.props.changeStage} reason={app.activeReason}/>
            ) }
            {noArchivedOffers}
            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <div id="AppList" className='archived-list'>
          <table>
            <thead>
              <tr>
                <th className='.archive-role-company' onClick={this.props.sort.bind(null, 'title')}>Role</th>
                <th className='.archive-role-company' onClick={this.props.sort.bind(null, 'company')}>Company</th>
                <th className='archive-stage-reason' onClick={this.props.sort.bind(null, 'stageId')}>Stage</th>
                <th className='archive-stage-reason' onClick={this.props.sort.bind(null, 'reason')}>Reason</th>
                <th className='archive-created' onClick={this.props.sort.bind(null, 'createdAt')}>Created</th>
              </tr>
            </thead>
            <tbody>
            { this.props.filteredArchiveJobs.map((app, i) =>
              <ArchiveJob key={i} filter={this.props.filter} filtered={this.props.filtered} sortList={this.props.sortList} stages={this.props.stages} company={app.company} created={app.createdAt} job={app.title} company={app.company} jobId={app.jobId} stage={this.props.stages[app.stageId]} id={app.id} changeStage={this.props.changeStage} reason={app.activeReason} />
            ) }
            {noArchivedOffers}
            </tbody>
          </table>
        </div>
      )
    }
  }
};