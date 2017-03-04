import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import axios from 'axios';

class SearchResultIcons extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="buttons-div">
        <div className="buttons-container">
          <button className="result-btn select" onClick={this.props.addJob.bind(null, this.props.result, this.props.index)} >✔</button>
          <button className="result-btn remove" onClick={this.props.removeJob.bind(null, this.props.index)} >✘</button>
        </div>
      </div>
    )
  }
}

//TODO line 15 needs some action for link clicks
export default SearchResultIcons;