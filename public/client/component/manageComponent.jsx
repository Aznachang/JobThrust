import React from 'react';
import StageList from './StagesComponent.jsx';
import ApplicationList from './ApplicationList.jsx';
import $ from 'jQuery';

export default class ManageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
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
        }) 
      }
    })
  }
  render() {
    return (
      <div>
        <StageList stages={['Interested', 'Applied', 'Phone Screen','On-Site', 'Decision', 'Offered'] }/>
        <ApplicationList jobInfo={this.state.jobs} />
      </div>
    )
  }
}

