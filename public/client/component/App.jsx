import React from 'react';
import ManageComponent from './ManageComponent.jsx';
import NavBar from './NavBar.jsx';
import SearchContainer from './SearchView/SearchContainer.jsx';

export default class App extends React.Component {
	constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <NavBar/>
        {this.props.children}
      </div>
    )
  }
}