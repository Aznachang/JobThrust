import React from 'react';

export default class ESSearches extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.searches.map((search, i) =>
          <div key={i} onClick={this.props.selectResults.bind(null, i)}>{search.label}</div>
        )}
      </div>
    )
  }
}