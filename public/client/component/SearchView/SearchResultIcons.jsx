import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import axios from 'axios';
//import ReactDOM from 'react-dom';

class SearchResultIcons extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div style={{'display': 'inline', 'float': 'right'}}>
      <button onClick={this.props.getInfo} >ℹ</button>
      <button className="result-btn select" onClick={this.props.addJob.bind(null, this.props.result, this.props.index)} >✔</button>
      <button className="result-btn remove" onClick={this.props.removeJob.bind(null, this.props.index)} >✘</button>
      </div>
    )  
  }
}

//TODO line 15 needs some action for link clicks
export default SearchResultIcons;