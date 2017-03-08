import React from 'react';

export default class ESResults extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.results.map((result, i) =>
          <div key={i}>{result.title} - {result.company}</div>
        )}
      </div>
    )
  }
}