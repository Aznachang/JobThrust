import React from 'react';
import StageList from './StagesComponent.jsx';
import ApplicationList from './ApplicationList.jsx';
import $ from 'jQuery';

export default class ManageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      stageCounts: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
      }
    }
    this.getJobs();
  }

  getJobs() {
    var context = this;
    $.ajax({
      url: 'http://localhost:3000/api/application',
      method: 'GET',
      contentType: 'application/json',
      success: function(data) {
        context.setState({
          jobs: data
        });
        console.log('State jobs data:', context.state.jobs);
        var stageValues = {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0
        };
        data.forEach(function(app) {
          console.log('APP STAGE ID:', app.stageId, typeof app.stageId);
          stageValues[app.stageId]++;
        });
        context.setState({stageCounts: stageValues});
        console.log('Counts for stages:', context.state.stageCounts);
      }
    })
  }
  render() {
    return (
      <div>
        <StageList stageCounts={this.state.stageCounts} stages={['Interested', 'Applied', 'Phone Screen','On-Site', 'Decision', 'Offered'] }/>
        <ApplicationList jobInfo={this.state.jobs} />
      </div>
    )
  }
}

