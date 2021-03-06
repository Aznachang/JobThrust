import React from 'react';
import {Link} from 'react-router';
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
      },
      ascending: true
    }
    this.getJobs = this.getJobs.bind(this);
    this.changeStage = this.changeStage.bind(this);
    this.getStageCounts = this.getStageCounts.bind(this);
    this.sortListByStage = this.sortListByStage.bind(this);
    this.filter = this.filter.bind(this);
    this.sort = this.sort.bind(this);
  }

  getJobs() {
    var context = this;

    $.ajax({
      url: '/api/application',
      method: 'GET',
      contentType: 'application/json',
      success: function(data) {
        var active = [];

        data.sort(function(a, b) {
          return b.stageId - a.stageId;
        });

        data.forEach(function(job) {
          if (job.active === true) {
            active.push(job);

            context.setState({
              jobs: active,
            });
          }
        });
        context.getStageCounts();
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
    axios.post('/api/application/stagechange', {
      applicationId: id,
      stageId: stageId,
      jobId: jobId
    })
    .then(function(response){
      // stageId === 5 --> fire up the form
      if (stageId === 5) {
        axios.post('/api/application/offers', {
          // MUST MATCH 'req.body' in 'routes.js'
          jobId: jobId,
          applicationId: id
        }).then(function(offer){
          alert('Job Offer Saved!');
        });
      } //end of 'if'
    });
  }

  changeStage(id, newStageId) {
    var jobsCurrent = this.state.jobs;
    for (var i = 0; i < jobsCurrent.length; i++) {
      if (id === jobsCurrent[i].id && jobsCurrent[i].stageId < 5) {
        jobsCurrent[i].stageId = newStageId;
        this.postStageChange(jobsCurrent[i].id, jobsCurrent[i].stageId, jobsCurrent[i].jobId);

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
      this.render();
    } else {
      this.setState({filtered: null, boxClasses: boxClasses});
      this.render();
    }
  }

  sort(value) {
    var context = this;
    if(this.state.filteredJobs.length && typeof this.state.filteredJobs[0][value] === 'string') {
      this.state.filteredJobs.sort(function(a, b) {
        var A = a[value].toUpperCase();
        var B = b[value].toUpperCase();

        if (context.state.ascending) {
          if (A < B) { return -1; }
          if (A > B) { return 1; }
          return 0;
        } else {
           if (A < B) {return 1;}
           if( A > B) {return -1;}
           return 0;
         }
      })
    }
    if(typeof this.state.jobs[0][value] === 'string') {
      this.state.jobs.sort(function(a, b) {
        var A = a[value].toUpperCase();
        var B = b[value].toUpperCase();

        if (context.state.ascending) {
          if (A < B) { return -1; }
          if (A > B) { return 1; }
          return 0;
         } else {
           if (A < B) {return 1;}
           if( A > B) {return -1;}
           return 0;
         }
      })
    }
    if(this.state.filteredJobs.length && typeof this.state.filteredJobs[0][value] === 'number') {
      this.state.filteredJobs.sort(function(a, b) {
        return a[value] - b[value];
      })
    }
    if(typeof this.state.jobs[0][value] === 'number') {
      this.state.jobs.sort(function(a, b) {
        return a[value] - b[value];
      })
    }
    this.setState({
      jobs: this.state.jobs,
      ascending: !this.state.ascending
    })
  }

  sortListByStage() {
    var jobsCurrent = this.state.jobs;
    jobsCurrent.sort(function(a, b) {
      return b.stageId - a.stageId
    });

    this.setState({jobs: jobsCurrent});

  }

  componentWillMount() {
    this.getJobs();
  }

  render() {
    var stages = ['Interested', 'Applied', 'Phone Screen','On-Site', 'Decision', 'Offered']
    return (
      <div>
        <StageList boxClasses={this.state.boxClasses} filter={this.filter} filtered={this.state.filtered} stageCounts={this.state.stageCounts} stages={stages}/>
        <div className="add-app-manual">
          <Link to={'/archived'}><div className="add-app-btn archived-btn">
            VIEW ARCHIVED OPPORTUNITIES
          </div></Link>
        </div>
        <AddAppManual getJobs={this.getJobs} />
        <ApplicationList sort={this.sort} filter={this.filter} filtered={this.state.filtered} filteredJobs={this.state.filteredJobs} jobInfo={this.state.jobs} sortList={this.sortListByStage} stages={stages} selectedAppJob={this.state.selectedAppJob} changeStage={this.changeStage} getJobs={this.getJobs} />
      </div>
    )
  }
}

