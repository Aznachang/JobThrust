import React from 'react';
import StageList from './StagesComponent.jsx';
import ApplicationList from './ApplicationList.jsx';

export default class ManageComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        
        <StageList stages={['Interested', 'Applied', 'Phone Screen','On-Site', 'Decision', 'Offered'] }/>
        <ApplicationList/>

      </div>
    )
  }
}
