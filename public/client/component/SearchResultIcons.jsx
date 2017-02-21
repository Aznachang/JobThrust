import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import axios from 'axios';
//import ReactDOM from 'react-dom';

class SearchResultIcons extends React.Component {
  constructor(props){
    super(props)
    this.addJob = this.addJob.bind(this);
  }

  addJob(result) {
    axios.post('/api/job', {
      title: result.jobtitle,
      description: result.snippet,
      company: result.company,
      key: result.jobkey
    })
  }


  render() {
    var icons = ['✔', '✘', 'ℹ'];
    var iconBar = icons.map((icon, index)=> {
      return (
        <button key={index}>{icon}</button>
      );
    });
    return (
      <div style={{'display': 'inline', 'float': 'right'}}>
      {iconBar}
      <button onClick={this.addJob.bind(null, this.props.result)} >Test</button>
      </div>
    )  
  }
}

//TODO line 15 needs some action for link clicks
export default SearchResultIcons;