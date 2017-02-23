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
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      }
    }
    this.getJobs();
    this.changeStage = this.changeStage.bind(this);
    this.getStageCounts = this.getStageCounts.bind(this);
  }

  getJobs() {
    var context = this;
    $.ajax({
      url: 'http://localhost:3000/api/application',
      method: 'GET',
      contentType: 'application/json',
      success: function(data) {
        data.sort(function(a, b) {
          return b.stageId - a.stageId;
        });
        context.setState({
          jobs: data
        });
        console.log('State jobs data:', context.state.jobs);

        context.getStageCounts();

        console.log('Counts for stages:', context.state.stageCounts);
      }
    })
  }

  getStageCounts() {
    var jobData = this.state.jobs;
    var stageValues = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };

    jobData.forEach(function(app) {
      stageValues[app.stageId]++;
    });

    this.setState({stageCounts: stageValues});

  }

  changeStage(id) {
    console.log('Running changeStage from parent!');
    var jobsCurrent = this.state.jobs;
    for (var i = 0; i < jobsCurrent.length; i++) {
      if (id === jobsCurrent[i].id && jobsCurrent[i].stageId < 5) {
        console.log('Changing stage ID for:', jobsCurrent[i]);
        jobsCurrent[i].stageId++;
        console.log('StageID changed:', jobsCurrent[i]);
        break;
      }
    }

    this.setState({jobs: jobsCurrent});
    this.getStageCounts();

    this.render();
  }

  render() {
    var stages = ['Interested', 'Applied', 'Phone Screen','On-Site', 'Decision', 'Offered']
    return (
      <div>
        <StageList stageCounts={this.state.stageCounts} stages={stages}/>
        <ApplicationList jobInfo={this.state.jobs} stages={stages} changeStage={this.changeStage} />
      </div>
    )
  }
}

