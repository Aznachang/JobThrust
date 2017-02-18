import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
//import ReactDOM from 'react-dom';

class SearchResultIcons extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    var icons = ['✔', '✘', 'i'];
    var iconBar = icons.map((icon, index)=> {
      return (
        <li key={index}>
          <Link>{icon}</Link>
        </li>
      );
    });
    return (
      <ul>{iconBar}</ul>
    )  
  }
}

//TODO line 15 needs some action for link clicks
export default SearchResultIcons;