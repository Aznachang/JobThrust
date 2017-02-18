import React from 'react';
import StageList from './stagesComponent.jsx';

export default class ManageComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <StageList stages={['Stage One', 'Stage Two ','Stage Three'] }/>
    )
  }
}
