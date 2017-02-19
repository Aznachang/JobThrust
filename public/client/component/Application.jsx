import React from 'react':

export default class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    <div>
      <span class="job-title">this.props.job</span>
      <span class="company">this.props.company</span>
      <span class="stage">this.props.stage</span>
    </div>
  }
}