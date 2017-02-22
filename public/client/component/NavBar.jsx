import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import axios from 'axios';

//import ReactDOM from 'react-dom';

class NavBar extends React.Component {
  constructor(props){
    super(props)
  }

  logOut() {
    axios.get('/auth/logout');
  }

  render() {
    return (
      <ul className="nav-bar">
        <li>
          <Link to={'/manage'}>Manage</Link>
        </li>
        <li>
          <Link to={'/search'}>Search</Link>
        </li>
        <li>
          <a href="/login" className="logout-btn" onClick={this.logOut}>Log Out</a>
        </li>
      </ul>
    )  
  }
}

export default NavBar;