import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
//import ReactDOM from 'react-dom';

class SearchResultIcons extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    var icons = [' ✔ ', ' ✘ ', ' info '];
    var iconBar = icons.map((icon, index)=> {
      return (
        <span key={index}>{icon}</span>
      );
    });
    return (
      <div style={{'display': 'inline', 'float': 'right'}}>{iconBar}</div>
    )  
  }
}

//TODO line 15 needs some action for link clicks
export default SearchResultIcons;