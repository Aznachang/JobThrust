import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';

//import ReactDOM from 'react-dom';

class NavBar extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    var pages = ['manage', 'search', 'logout'];
    var navBar = pages.map((page, index)=> {
      return (
        <li key={index}>
          <Link to={'/' + page}>{page}</Link>
        </li>
      );
    });
    return (
      <ul>{navBar}</ul>
    )  
  }
}

export default NavBar;