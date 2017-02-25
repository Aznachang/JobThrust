import React from 'react';
import StageList from './StagesComponent.jsx';
import ApplicationList from './ApplicationList.jsx';
import AddAppManual from './AddAppManual.jsx';
import $ from 'jQuery';
import axios from 'axios';

export default class ManageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      filteredJobs: [],
      stageCounts: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      },
      filtered: null,
      boxClasses: {
        0: 'stage-box',
        1: 'stage-box',
        2: 'stage-box',
        3: 'stage-box',
        4: 'stage-box',
        5: 'stage-box'
      }
    }
    this.getJobs = this.getJobs.bind(this);
    this.changeStage = this.changeStage.bind(this);
    this.getStageCounts = this.getStageCounts.bind(this);
    this.sortListByStage = this.sortListByStage.bind(this);
    this.filter = this.filter.bind(this);
    this.sort = this.sort.bind(this);
    this.getJobs();
  }

  getJobs() {
    var context = this;
    console.log(context);
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

  //id - applicationId
  postStageChange(id, stageId, jobId) {
    axios.post('http://localhost:3000/api/application/stagechange', {
      applicationId: id,
      stageId: stageId,
      jobId: jobId
    })
    .then(function(response){
      console.log('INSIDE postStageChange!');
      // stageId === 5 --> fire up the form
      if (stageId === 5) {
        axios.post('http://localhost:3000/api/application/offers', {
          // MUST MATCH 'req.body' in 'routes.js'
          jobId: jobId,
          applicationId: id
        }).then(function(offer){

        });
      } //end of 'if'
    });
  }

  changeStage(id, newStageId) {
    console.log('Running changeStage from parent!');
    var jobsCurrent = this.state.jobs;
    for (var i = 0; i < jobsCurrent.length; i++) {
      if (id === jobsCurrent[i].id && jobsCurrent[i].stageId < 5) {
        console.log('Changing stage ID for:', jobsCurrent[i]);
        jobsCurrent[i].stageId = newStageId;
        this.postStageChange(jobsCurrent[i].id, jobsCurrent[i].stageId, jobsCurrent[i].jobId);
        console.log('StageID changed:', jobsCurrent[i]);

        // Re-sort jobsCurrent by stageID

        this.setState({jobs: jobsCurrent});
        this.getStageCounts();

        this.render();
        break;
      }
    }
  }

  filter(stageNum) {
    var boxClasses = {
      0: 'stage-box',
      1: 'stage-box',
      2: 'stage-box',
      3: 'stage-box',
      4: 'stage-box',
      5: 'stage-box'
    }

    if (stageNum !== undefined) {
      boxClasses[stageNum] = 'stage-box selected-box';
      var currentJobs = this.state.jobs;
      var filteredJobs = currentJobs.filter(function(job) {
        return job.stageId === stageNum;
      });
      this.setState({filtered: stageNum, boxClasses: boxClasses, filteredJobs: filteredJobs});
      console.log('FILTER HAPPENED: ');
      this.render();
    } else {
      this.setState({filtered: null, boxClasses: boxClasses});
      console.log('UNFILTER HAPPENED');
      this.render();
    }
  }

  sort(value) {
    console.log("this.state.jobs", this.state.jobs[0][value], typeof this.state.jobs[0][value])
    if(this.state.filteredJobs.length && typeof this.state.filteredJobs[0][value] === 'string') {
      console.log('#filtered: ', value)
      console.log(this.state.filteredJobs.sort(function(a, b) {
        var A = a[value].toUpperCase();
        var B = b[value].toUpperCase();
        if (A < B) { return -1; }
        if (A > B) { return 1; }
        return 0;
      }))
    }
    if(typeof this.state.jobs[0][value] === 'string') {
      console.log('#nofilter')
      console.log(this.state.jobs.sort(function(a, b) {
        var A = a[value].toUpperCase();
        var B = b[value].toUpperCase();
        if (A < B) { return -1; }
        if (A > B) { return 1; }
        return 0;
      }))
    }
    if(this.state.filteredJobs.length && typeof this.state.filteredJobs[0][value] === 'number') {
      console.log('#filtered', value)
      console.log(this.state.filteredJobs.sort(function(a, b) {
        return a[value] - b[value];
      }))
    }
    if(typeof this.state.jobs[0][value] === 'number') {
      console.log('#nofilter', value)
      console.log(this.state.jobs.sort(function(a, b) {
        return a[value] - b[value];
      }))
    }
    this.setState({
      //filteredJobs: this.state.filteredJobs,
      jobs: this.state.jobs
    })
  }

  sortListByStage() {
    var jobsCurrent = this.state.jobs;
    jobsCurrent.sort(function(a, b) {
      return b.stageId - a.stageId
    });

    this.setState({jobs: jobsCurrent});

  }


  render() {
    var stages = ['Interested', 'Applied', 'Phone Screen','On-Site', 'Decision', 'Offered']
    return (
      <div>
        <StageList boxClasses={this.state.boxClasses} filter={this.filter} filtered={this.state.filtered} stageCounts={this.state.stageCounts} stages={stages}/>
        <AddAppManual getJobs={this.getJobs} />
        <ApplicationList sort={this.sort} filter={this.filter} filtered={this.state.filtered} filteredJobs={this.state.filteredJobs} jobInfo={this.state.jobs} sortList={this.sortListByStage} stages={stages} selectedAppJob={this.state.selectedAppJob} changeStage={this.changeStage} />
      </div>
    )
  }
}

