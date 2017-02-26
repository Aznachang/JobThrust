import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import axios from 'axios';

class NavBar extends React.Component {
  constructor(props){
    super(props)
  }

  logOut() {
    axios.get('/auth/logout');
  }

  render() {
    return (
      <div className='nav-bar'>
        <div className='app-name'>HireGuide</div>
        <ul className='nav-links'>
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
      </div>
    )
  }
}

export default NavBar;