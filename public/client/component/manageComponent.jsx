import React from 'react';
import StageList from './StagesComponent.jsx';
import ApplicationList from './ApplicationList.jsx';
import $ from 'jQuery';
import axios from 'axios';

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

  postStageChange(id, stageId) {
    $.ajax({
      url: 'http://localhost:3000/api/application/stagechange',
      method: 'POST',
      data: {id: id, stageId: stageId}
    });
  }

  changeStage(id, newStageId) {
    console.log('Running changeStage from parent!');
    var jobsCurrent = this.state.jobs;
    for (var i = 0; i < jobsCurrent.length; i++) {
      if (id === jobsCurrent[i].id && jobsCurrent[i].stageId < 5) {
        console.log('Changing stage ID for:', jobsCurrent[i]);
        jobsCurrent[i].stageId = newStageId;
        this.postStageChange(jobsCurrent[i].id, jobsCurrent[i].stageId);
        console.log('StageID changed:', jobsCurrent[i]);
        this.setState({jobs: jobsCurrent});
        this.getStageCounts();

        this.render();
        break;
      }
    }

  }

  render() {
    var stages = ['Interested', 'Applied', 'Phone Screen','On-Site', 'Decision', 'Offered']
    return (
      <div>
        <StageList stageCounts={this.state.stageCounts} stages={stages}/>
        <ApplicationList jobInfo={this.state.jobs} stages={stages} selectedAppJob={this.state.selectedAppJob} changeStage={this.changeStage} />
      </div>
    )
  }
}

