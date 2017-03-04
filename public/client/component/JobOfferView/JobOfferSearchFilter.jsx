import React from 'react';

export default class JobOfferSearchFilter extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange() {
    this.props.onUserInput(this.refs.filterTextOfferInput.value);
  }
  render() {
    return (
      <div id='offer-filterbar'>
        <br/>
        <input type="text" placeholder="Filter By Company Name..." value={this.props.filterText} ref="filterTextOfferInput" onChange={this.handleSearchChange}/>
      </div>
    );
  }
}