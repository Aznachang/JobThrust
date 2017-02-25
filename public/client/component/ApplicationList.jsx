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
              <Application key={i} filter={this.props.filter} filtered={this.props.filtered} sortList={this.props.sortList} stages={this.props.stages} job={app.title} jobId={app.jobId} stage={this.props.stages[app.stageId]} id={app.id} changeStage={this.props.changeStage} />
            ) }
            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <div id="AppList">
          <form>
            <input type="button" name="newest" value="newest" onClick={this.props.sort} />
            <input type="button" name="oldest" value="oldest" onClick={this.props.sort} />
          </form>
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>Current Stage</th>
              </tr>
            </thead>
            <tbody>
            { this.props.filteredJobs.map((app, i) =>
              <Application key={i} filter={this.props.filter} filtered={this.props.filtered} sortList={this.props.sortList} stages={this.props.stages} job={app.title} jobId={app.jobId} stage={this.props.stages[app.stageId]} id={app.id} changeStage={this.props.changeStage} />
            ) }
            </tbody>
          </table>
        </div>
      )
    }
  }
};