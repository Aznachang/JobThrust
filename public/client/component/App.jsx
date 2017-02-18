import React from 'react'
import ManageComponent from './manageComponent.jsx'

export default class App extends React.Component {
	constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ManageComponent/>
      </div>
    )
  }
}