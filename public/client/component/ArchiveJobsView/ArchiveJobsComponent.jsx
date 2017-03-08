import React from 'react';
import ArchivedStages from './ArchivedStages.jsx';
import ArchiveJobsList from './ArchiveJobsList.jsx';
import $ from 'jQuery';
import axios from 'axios';

export default class ArchiveJobsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      archivedJobs: [],
      filteredArchivedJobs: [],
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
    this.getStageCounts = this.getStageCounts.bind(this);
    this.sortListByStage = this.sortListByStage.bind(this);
    this.filter = this.filter.bind(this);
    this.sort = this.sort.bind(this);
    this.getJobs();
  }

  getJobs() {
    var context = this;

    $.ajax({
      url: '/api/application',
      method: 'GET',
      contentType: 'application/json',
      success: function(data) {
        data.sort(function(a, b) {
          return b.stageId - a.stageId;
        });
        // var active = [];
        var archived = [];

        data.forEach(function(job){
          console.log('Inside forEach Data - job!');
          if (job.active === false) {
            archived.push(job);

            context.setState({
              archivedJobs: archived
            });
          }
        });
          // context.setState({
          //   archivedJobs: archived
          // });

        console.log('State jobs data:', context.state.jobs);
        console.log('Archived Jobs data: ', context.state.archivedJobs);
        context.getStageCounts();

        console.log('Counts for stages:', context.state.stageCounts);
      }
    })
  }

  getStageCounts() {
    var archivedJobData = this.state.archivedJobs;
    var stageValues = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };

    archivedJobData.forEach(function(app) {
      stageValues[app.stageId]++;
    });

    this.setState({stageCounts: stageValues});
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
      var currentJobs = this.state.archivedJobs;
      var filteredArchivedJobs = currentJobs.filter(function(job) {
        return job.stageId === stageNum;
      });
      this.setState({filtered: stageNum, boxClasses: boxClasses, filteredArchivedJobs: filteredArchivedJobs});
      console.log('FILTER HAPPENED: ');
      this.render();
    } else {
      this.setState({filtered: null, boxClasses: boxClasses});
      console.log('UNFILTER HAPPENED');
      this.render();
    }
  }

  sort(value) {
    var context = this;
    // console.log("this.state.jobs", this.state.jobs[0][value], typeof this.state.jobs[0][value])
    if(this.state.filteredArchivedJobs.length && typeof this.state.filteredArchivedJobs[0][value] === 'string') {
      console.log('#filtered: ', value)
      console.log(this.state.filteredArchivedJobs.sort(function(a, b) {
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
      }))
    }
    if(typeof this.state.archivedJobs[0][value] === 'string') {
      console.log('#nofilter')
      console.log(this.state.archivedJobs.sort(function(a, b) {
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
      }))
    }
    if(this.state.filteredArchivedJobs.length && typeof this.state.filteredArchivedJobs[0][value] === 'number') {
      console.log('#filtered', value)
      console.log(this.state.filteredArchivedJobs.sort(function(a, b) {
        return a[value] - b[value];
      }))
    }
    if(typeof this.state.archivedJobs[0][value] === 'number') {
      console.log('#nofilter', value)
      console.log(this.state.archivedJobs.sort(function(a, b) {
        return a[value] - b[value];
      }))
    }
    this.setState({
      //filteredArchivedJobs: this.state.filteredArchivedJobs,
      archivedJobs: this.state.archivedJobs,
      ascending: !this.state.ascending
    })
  }

  sortListByStage() {
    var jobsCurrent = this.state.archivedJobs;
    jobsCurrent.sort(function(a, b) {
      return b.stageId - a.stageId
    });

    this.setState({archivedJobs: jobsCurrent});

  }

  render() {
    var stages = ['Interested', 'Applied', 'Phone Screen','On-Site', 'Decision', 'Offered']
    return (
      <div>
        <ArchivedStages boxClasses={this.state.boxClasses} filter={this.filter} filtered={this.state.filtered} stageCounts={this.state.stageCounts} stages={stages}/>
        <ArchiveJobsList sort={this.sort} filter={this.filter} filtered={this.state.filtered} filteredArchiveJobs={this.state.filteredArchivedJobs} archivedInfo={this.state.archivedJobs} sortList={this.sortListByStage} stages={stages} selectedAppJob={this.state.selectedAppJob} />
      </div>
    )
  }
}

